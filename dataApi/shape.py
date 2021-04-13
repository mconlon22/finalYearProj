import shapefile
from shapely.geometry import shape, Point
from minRect import minimum_bounding_rectangle 
import json
path="./shapefiles/Covid19_LEACases_Mapped.shp"
r = shapefile.Reader(path)
shapes = r.shapes()

def getLocName(lat,lon):
    def check(polygon,lon, lat):
        # build a shapely point from your geopoint
        point = Point(lon, lat)

        # the contains function does exactly what you want
        return polygon.contains(point)
        
    # read your shapefile

    # get the shapes

    # build a shapely polygon from your shape

    # name of fields
    fields = r.fields[1:] 
    field_names = [field[0] for field in fields]
    for i,val in enumerate(shapes):
        polygon = shape(val)
        if check(polygon,lon,lat):
            return dict(zip(field_names, r.shapeRecords()[i].record)) 
    return 'not found'
def getLocNames(locations):
    names=[]
    distinctNames={}
    for location in locations:
        loc=getLocName(location['lat'],location['lon'])
        if loc['ENGLISH'] not in distinctNames :
            distinctNames[loc['ENGLISH']]=1
            print(loc)
            names.append({'ENGLISH':loc['ENGLISH'],'P14_100k_T':loc['P14_100k_T']})
        
    return names
def getRect():
    with open(path) as f:
        gj = json.load(f)
    features = gj['features'][0]

def getBoudingBox(locationName):
    for i,record in enumerate(r.shapeRecords()):
        if record.record['ENGLISH']==locationName:
            bbox = r.shapes()[i].bbox
            return bbox


