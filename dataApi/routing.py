import requests
import json
import logging
from shape import getLocNames 
from shape import getBoudingBox
import requests

# These two lines enable debugging at httplib level (requests->urllib3->http.client)
# You will see the REQUEST, including HEADERS and DATA, and RESPONSE with HEADERS but without DATA.


requests.get('https://httpbin.org/headers')

class Router:
    fromLoc=0
    toLoc=0
    routes=[]
    def __init__(self,fromLoc,toLoc):
        self.fromLoc=fromLoc
        self.toLoc=toLoc

        
    def getAverageCovid(self,locationObjects):
        locationObjects=getLocNames(locationObjects)
        covidSum=0
        for location in locationObjects:
            covidSum+=float(location['P14_100k_T'])
        return covidSum/len(locationObjects)
    def getMaxCovid(self,locationObjects):
            locationObjects=getLocNames(locationObjects)

            covidMax=0
            maxLocation=0
            for location in locationObjects:
                if float(location['P14_100k_T']) > covidMax:
                    
                    covidMax=float(location['P14_100k_T'])
                    
                    maxLocation=location
            return maxLocation
    def getRoutes(self):
        locationObjects=self.routeApi()
        locationJson=self.locationsToJsonRoute(locationObjects)
        self.routes.append(locationJson)
        average1=self.getAverageCovid(locationObjects)
        bboxstr=self.getBboxString(locationObjects)
        secondRoute=self.routeApi(bboxstr=bboxstr)
        secondjson=self.locationsToJsonRoute(secondRoute)
        self.routes.append(secondjson)
        average2=self.getAverageCovid(secondRoute)
        return self.routes

    def locationsToJsonRoute(self,locations):
        latlons=[]
        for location in locations:
            latlons.append({'lat':location['lat'],'lon':location['lon']})
        return json.dumps(latlons)
        


    def routeApi(self, *args, **kwargs):

        payload={
      'apiKey':'z-0ZGCEpEnMAmOC7w2-IGoo76Y6bg0Yhu-xIE8CVziM',
      'waypoint0':'geo!'+str(self.fromLoc['lat'])+','+str(self.fromLoc['lng']),
      'waypoint1':'geo!'+str(self.toLoc['lat'])+','+str(self.toLoc['lng']),
      'mode':'fastest;car;traffic:disabled',
      'avoidareas':'',

      'return': 'polyline'

        }
        if  isinstance(kwargs.get('bboxstr',None),str):
            payload['avoidareas']=kwargs.get('bboxstr',None)
        
        r = requests.get('https://route.ls.hereapi.com/routing/7.2/calculateroute.json', params=payload)
        r=r.json()
        locations=r['response']['route'][0]['leg'][0]['maneuver']
        for location in locations:
            location['lat']=location['position']['latitude']
            location['lon']=location['position']['longitude']
            del location['position']
        return locations
    

        

    def getBboxString(self,locationObjects):
            avoidareas=''
            maxCovid=self.getMaxCovid(locationObjects[1:len(locationObjects)-1])
            boundingBox=getBoudingBox(maxCovid['ENGLISH'])
            avoidareas+=str(boundingBox[3])+','+str(boundingBox[2])+';'+str(boundingBox[1])+','+str(boundingBox[0])
            return avoidareas
            
           
    







     