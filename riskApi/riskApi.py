from riskcalc import User
from flask_cors import CORS
from flask import Flask, request, Response

app = Flask(__name__)
# SQLAlchemy config. Read more: https://flask-sqlalchemy.palletsprojects.com/en/2.x/

cors = CORS(app)
@app.route('/userRisk',methods=['POST'])
def userRisk():
    age = int (request.args.get('age')  )
    sex = request.args.get('sex')
    height = float(request.args.get('height'))
    weight = int(request.args.get('weight'))
    smoking = request.args.get('smoking')
    ethnicity = request.args.get('ethnicity')
    print('hi')
    print(age,sex,height,weight,smoking,ethnicity)

    user=User(age,sex,height,weight,smoking,ethnicity)
    return str(user.getRisk())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=85)
