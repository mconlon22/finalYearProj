import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  createLeafletElement() {
    console.log("this.props.to")

    console.log(this.props.to)
    if(!isNaN(this.props.to.lat)&&!isNaN(this.props.from.lat)){
    const { map } = this.props;
    var to=this.props.to
    var from =this.props.from
    console.log('type')
    console.log(parseFloat(to.lat), 53.30001)
    let leafletElement = L.Routing.control({
      waypoints: [L.latLng(to.lat,to.lng) ,L.latLng(from.lat,from.lng)]
      ,
      // router: new L.Routing.Google(),
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 0.6,
            weight: 4
          }
        ]
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false
    }).addTo(map.leafletElement);

    return leafletElement.getPlan();}
  }
}
export default withLeaflet(Routing);