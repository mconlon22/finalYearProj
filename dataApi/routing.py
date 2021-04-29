import requests
import json
import logging
from shape import getLocNames 
from shape import getBoudingBox
import requests
import time
from credentials import getToken

# These two lines enable debugging at httplib level (requests->urllib3->http.client)
# You will see the REQUEST, including HEADERS and DATA, and RESPONSE with HEADERS but without DATA.



class Router:
    fromLoc=0
    toLoc=0
    names=[]
    token=getToken()['access_token']
   
    def __init__(self,fromLoc,toLoc):
        self.fromLoc=fromLoc
        self.toLoc=toLoc

        
    def getAverageCovid(self,locationObjects):
        locationObjects=self.names
        covidSum=0
        for location in locationObjects:
            if location['P14_100k_T']!='Less than 5 cases':
                covidSum+=float(location['P14_100k_T'])
        return covidSum/len(locationObjects)
    def getMaxCovid(self,locationObjects):
            locationObjects=self.names

            covidMax=0
            maxLocation=0
            for location in locationObjects:
                if location['P14_100k_T']!='Less than 5 cases':
                    if float(location['P14_100k_T']) > covidMax:
                        
                        covidMax=float(location['P14_100k_T'])
                        
                        maxLocation=location
            return maxLocation
    def getRoutes(self):
        routes=[]

        response=self.routeApi()
        locationObjects=response['response']['route'][0]['leg'][0]['maneuver']
        self.names=getLocNames(locationObjects)
        locationJson=self.locationsToJsonRoute(locationObjects)

        routes.append(locationJson)
        average1=self.getAverageCovid(locationObjects)
        bboxstr=self.getBboxString(locationObjects)
        response1=self.routeApi(bboxstr=bboxstr)
        secondRoute=response1['response']['route'][0]['leg'][0]['maneuver']
        self.names=getLocNames(secondRoute)
        time.sleep(2)


        secondjson=self.locationsToJsonRoute(secondRoute)
        routes.append(secondjson)
        average2=self.getAverageCovid(secondRoute)
        return routes

    def locationsToJsonRoute(self,locations):
        latlons=[]
        returnObject=[]
        for location in locations:
            latlons.append({'lat':location['lat'],'lon':location['lon'],'id':location['id']})
        returnObject.append({'LocNames':self.names,'latlons':latlons})
        return json.dumps(returnObject)
        


    def routeApi(self, *args, **kwargs):

        payload={
            'Content-Type':'application/json',
      'waypoint0':'geo!'+str(self.fromLoc['lat'])+','+str(self.fromLoc['lng']),
      'waypoint1':'geo!'+str(self.toLoc['lat'])+','+str(self.toLoc['lng']),
      'mode':'fastest;car;traffic:disabled',
      'avoidareas':'',

      'return': 'polyline'

        }
        if  isinstance(kwargs.get('bboxstr',None),str):
            payload['avoidareas']=kwargs.get('bboxstr',None)
        securityparams={'grant_type':'client_credentials'}

        r = requests.get('https://route.ls.hereapi.com/routing/7.2/calculateroute.json',headers={'Authorization': 'Bearer {}'.format(self.token)},params=payload)
        r=r.json()
        locations=r['response']['route'][0]['leg'][0]['maneuver']
        for location in locations:
            location['lat']=location['position']['latitude']
            location['lon']=location['position']['longitude']

            del location['position']
        r['response']['route'][0]['leg'][0]['maneuver']=locations
        return r
    

        

    def getBboxString(self,locationObjects):
            avoidareas=''
            maxCovid=self.getMaxCovid(locationObjects[1:len(locationObjects)-1])
            boundingBox=getBoudingBox(maxCovid['ENGLISH'])
            avoidareas+=str(boundingBox[3])+','+str(boundingBox[2])+';'+str(boundingBox[1])+','+str(boundingBox[0])
            return avoidareas
            
           
    







     