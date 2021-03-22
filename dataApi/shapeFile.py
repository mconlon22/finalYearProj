import shapefile
from shapely.geometry import shape, Point

def getLocName(lat,lon):
    def check(polygon,lon, lat):
        # build a shapely point from your geopoint
        point = Point(lon, lat)

        # the contains function does exactly what you want
        return polygon.contains(point)
        
    # read your shapefile
    r = shapefile.Reader("./shapefiles/Covid19_LEACases_Mapped.shp")

    # get the shapes
    shapes = r.shapes()

    # build a shapely polygon from your shape


    # name of fields
    fields = r.fields[1:] 
    field_names = [field[0] for field in fields]
    for i,val in enumerate(shapes):
        polygon = shape(val)
        if check(polygon,lon,lat):
            print('hello') 
            return dict(zip(field_names, r.shapeRecords()[i].record)) 
    return 'not found'

