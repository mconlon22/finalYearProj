from dataScraper import getCovidDataObject
import time
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_

from flask import Flask,request
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from data import val
from datetime import datetime
from shapeFile import getLocName
import json
from sqlalchemy import desc

from flask import jsonify
import requests
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)
ma = Marshmallow(app)
cors = CORS(app)
class CovidData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
   
    date= db.Column(db.DateTime, unique=True, nullable=False)
    totalPositive= db.Column(db.Integer(), unique=False, nullable=False)
    totalDeaths= db.Column(db.Integer(), unique=False, nullable=False)
    todaysCases= db.Column(db.Integer(), unique=False, nullable=False)
    todaysDeaths=db.Column(db.Integer(), unique=False, nullable=False)
    todaysIcu=db.Column(db.Integer(), unique=False, nullable=False)
    casesInHospital=db.Column(db.Integer(), unique=False, nullable=False)
    TestsLastWeek=db.Column(db.Integer(), unique=False, nullable=False)
    PositiveRate=db.Column(db.Integer(), unique=False, nullable=False)
    DateString= db.Column(db.String(120), unique=True, nullable=False)
    firstDose=db.Column(db.Integer(), unique=False, nullable=False)
    secondDose= db.Column(db.Integer(), unique=False, nullable=False)
    total=db.Column(db.Integer(), unique=False, nullable=False)

class AreaData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date= db.Column(db.Date, unique=False, nullable=False)
    location= db.Column(db.String(120), unique=False, nullable=False)
    amount= db.Column(db.Integer(), unique=False, nullable=False)

    


    
class CovidDataSchema(ma.Schema):
    class Meta:
        fields = ('date', 'totalPositive', 'totalDeaths', 'todaysCases','todaysDeaths','todaysIcu','casesInHospital','TestsLastWeek','PositiveRate','DateString','firstDose','secondDose','total')
        model = CovidData

class CovidAreaSchema(ma.Schema):
    class Meta:
        fields = ('date', 'location', 'amount' )
        model = AreaData

    # Smart hyperlinking
db.create_all()
    

@app.route('/')

def index():
    covidData=getCovidDataObject()
    time.sleep(8.02)
    date_obj = datetime.strptime(covidData["date"], '%d/%m/%Y')
    object =CovidData(date=date_obj,totalPositive=covidData["totalPositive"],  totalDeaths=covidData["totalDeaths"],todaysCases= covidData["todaysCases"],todaysDeaths=covidData["todaysDeaths"],todaysIcu=covidData["todaysIcu"],casesInHospital=covidData["casesInHospital"],TestsLastWeek=covidData["TestsLastWeek"],PositiveRate=covidData["PositiveRate"], DateString= covidData["DateString"],firstDose=covidData["firstDose"],secondDose=covidData["secondDose"],total=covidData["total"])
    db.session.add(object)
    db.session.commit() 
    return covidData

@app.route('/getCovid')
def getTodays():
    entities = CovidData.query.order_by(desc(CovidData.date)).limit(3).all()


    dataSchema = CovidDataSchema(many=True)
    print(entities)
    return jsonify(dataSchema.dump(entities))

@app.route('/getLocalData')
def getLocalData():
    lat=float(request.args["lat"])
    lon=float(request.args["lon"])
    userLocation=getLocName(lat,lon)
    data = AreaData.query.filter(AreaData.location.ilike(userLocation['ENGLISH'])).all()
    print(data)
    schema = CovidAreaSchema(many=True)
    print(schema.dump(data))
    return jsonify(schema.dump(data))
    
def jsonToSql():
    data=requests.get('https://services-eu1.arcgis.com/z6bHNio59iTqqSUY/arcgis/rest/services/Covid19_LEACases_Mapped_Historic_Records/FeatureServer/0/query?f=json&groupByFieldsForStatistics=CAST(EXTRACT(YEAR%20FROM%20EventDate%20-INTERVAL%20%27-1%3A59%3A59%27%20HOUR%20TO%20SECOND)%20AS%20VARCHAR(4))%20%7C%7C%20%27-%27%20%7C%7C%20CAST(EXTRACT(MONTH%20FROM%20EventDate%20-INTERVAL%20%27-1%3A59%3A59%27%20HOUR%20TO%20SECOND)%20AS%20VARCHAR(2))%20%7C%7C%20%27-%27%20%7C%7C%20CAST(EXTRACT(DAY%20FROM%20EventDate%20-INTERVAL%20%27-1%3A59%3A59%27%20HOUR%20TO%20SECOND)%20AS%20VARCHAR(2))%2CENGLISH&outFields=OBJECTID%2CP14_100k%2CEventDate%2CENGLISH&outStatistics=%5B%7B%22onStatisticField%22%3A%22P14_100k%22%2C%22outStatisticFieldName%22%3A%22value%22%2C%22statisticType%22%3A%22sum%22%7D%5D&resultType=standard&returnGeometry=false&spatialRel=esriSpatialRelIntersects&where=(EventDate%20BETWEEN%20timestamp%20%272021-01-01%2000%3A00%3A00%27%20AND%20CURRENT_TIMESTAMP)%20AND%20(EventDate%20BETWEEN%20timestamp%20%272021-01-04%2000%3A00%3A00%27%20AND%20timestamp%20%272021-03-15%2000%3A00%3A00%27)')
    data=data.json()

    for feature in data['features']:
        value=feature['attributes']['value']
        location=feature['attributes']['ENGLISH']
        date=datetime.strptime(feature['attributes']['EXPR_1'], '%Y-%m-%d')
        areaObject=AreaData(date=date,amount=value,location=location)
        db.session.add(areaObject)
        
    db.session.commit()

if __name__ == '__main__':

    app.run(debug=True)