import requests
import json
import logging
from shape import getLocNames 
from shape import getBoudingBox

class Router:
    fromLoc=0
    toLoc=0
    
    def __init__(self,fromLoc,toLoc):
        self.fromLoc=fromLoc
        self.toLoc=toLoc

        
    def getAverageCovid(self,locationObjects):
        covidSum=0
        for location in locationObjects:
            covidSum+=float(location['P14_100k_T'])
        return covidSum/len(locationObjects)
    def getMaxCovid(self,locationObjects):
            covidMax=0
            maxLocation=0
            for location in locationObjects:
                if float(location['P14_100k_T']) > covidMax:
                    
                    covidMax=float(location['P14_100k_T'])
                    
                    maxLocation=location
            return maxLocation
    def getRoutes(self):
        payload={
      'apiKey':'Qlda5wHYI6BmZkVSB8V2LSvXzHZzY85-4aT2uoNH7aU',
      'waypoint0':'geo!'+str(self.fromLoc['lat'])+','+str(self.fromLoc['lng']),
      'waypoint1':'geo!'+str(self.toLoc['lat'])+','+str(self.toLoc['lng']),
      'mode':'fastest;car;traffic:disabled',
      'avoidareas':'',
      'return': 'polyline'
        }
        
        r = requests.get('https://route.ls.hereapi.com/routing/7.2/calculateroute.json', params=payload)
        r=r.json()
        locations=r['response']['route'][0]['leg'][0]['maneuver']
        for location in locations:
            location['lat']=location['position']['latitude']
            location['lon']=location['position']['longitude']
            del location['position']
        locationObjects=getLocNames(locations)
        average=self.getAverageCovid(locationObjects)
        self.getRoutesBbox(locationObjects)

    def getRoutesBbox(self,locationObjects):
            avoidareas=''
            maxCovid=self.getMaxCovid(locationObjects[1:len(locationObjects)-1])
            boundingBox=getBoudingBox()
            print('maxCovid')

            print(maxCovid)
            
           
    







     