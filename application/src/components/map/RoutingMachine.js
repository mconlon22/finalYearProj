import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";

class Routing extends MapLayer {
  createLeafletElement() {
    const { map } = this.props;
    var {to,from}=this.props
    console.log('type')
    console.log(typeof to.lat,typeof 53.30001)
    let leafletElement = L.Routing.control({
      waypoints: [L.latLng(53.30001,-6.1778), L.latLng(53.30002,-6.1778)]
    }).addTo(map.leafletElement);

    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);