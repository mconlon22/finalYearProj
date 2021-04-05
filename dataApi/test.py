from routing import Router 
fromLoc={
    'lat':53.3015,
    'lng':-6.1778
}
toLoc={
    'lat':53.2984,
    'lng':-6.3003
}
r=Router(fromLoc,toLoc)
print(r.getRoutes())



admin=true 
needs_updating=true
if admin:
    if needs_updating:
        pass 
    else:
        
else: 
    print('you need admin privalages')