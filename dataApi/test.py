from routing import Router
from shape import getLocNames 
from shape import getBoudingBox
import time
from random import uniform
blackrock={'lat':53.3022,'lng':-6.1778}
dublinairport={'lat':53.4264,'lng':-6.2499}
tallaght={'lat':53.2854,'lng':-6.3658}
cork={'lat':51.8985,'lng':-8.4756}
meath={'lat':53.6055,'lng':-6.6564}
somewhere={'lat':53.2734,'lng':-7.77832031}



def getRandomLocation():
    return {'lat':uniform(52.42252295423907,54.00776876193478),'lng':uniform(-9.041748046875002,-6.470947265625)}

sumdecrease=0
counter=0

for index in range(200):
    location1=getRandomLocation()
    location2=getRandomLocation()
    router=Router(location1, location2)
    routes=[]
    locationObjects=router.routeApi()
    router.names=getLocNames(locationObjects)
    locationJson=router.locationsToJsonRoute(locationObjects)

    routes.append(locationJson)
    average1=router.getAverageCovid(locationObjects)
    bboxstr=router.getBboxString(locationObjects)
    secondRoute=router.routeApi(bboxstr=bboxstr)
    router.names=getLocNames(secondRoute)
    time.sleep(2)


    secondjson=router.locationsToJsonRoute(secondRoute)
    routes.append(secondjson)

    average2=router.getAverageCovid(secondRoute)
    if average2<average1:
        difference=((average1-average2)/average1)*100
        print('difference : ' + str(difference))
        sumdecrease+=difference
        counter+=1
    else: print('increase')
averageDecrease=sumdecrease/counter
print('average decrease = '+str( averageDecrease))