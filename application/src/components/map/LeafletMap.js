

import React,{ Component } from 'react'
import {Map,TileLayer,Popup,Marker,GeoJSON ,Circle} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import data from './Covid19_LEACases_Mapped.json'
import Routing from "./RoutingMachine";
import MapInfo from "./MapInfo";
import * as ELG from "esri-leaflet-geocoder";
import Grid from '@material-ui/core/Grid';

import L from "leaflet";

const max=2000
const min=getMin()
const range=max-min
function getMax() {
    var max=0

    for (var i=0 ; i<data.features.length ; i++) {
        if(data.features[i].properties.P14_100k>max){
            max=data.features[i].properties.P14_100k
        }
    }
    return max;
}
function getMin() {
    var min=1000

    for (var i=0 ; i<data.features.length ; i++) {
        
        if(data.features[i].properties.P14_100k<min){
            min=data.features[i].properties.P14_100k
        }
    }
    return min;
}
function getPercent(num){
    var range=max-min

    var x=((num-min)/range)*100
    if(num>max){x=100}
    return x
}
const getGeoJSONComponent=() =>{

    return(
        <GeoJSON
        data={data}
        color='red'
        fillColor='green'
        weight={1}
        onEachFeature={onEachFeature} />
        );
    }
    var percentColors = [
        { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
        { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
        { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];
    
    var getColorForPercentage = function(num) {
        var perc=100-getPercent(num)
            var r, g, b = 0;
            if(perc < 50) {
                r = 255;
                g = Math.round(5.1 * perc);
            }
            else {
                g = 255;
                r = Math.round(510 - 5.10 * perc);
            }
            var h = r * 0x10000 + g * 0x100 + b * 0x1;
            return '#' + ('000000' + h.toString(16)).slice(-6);
        }
function onEachFeature(feature, layer) {
        layer.setStyle({fillColor :getColorForPercentage(feature.properties.P14_100k)}) 
        layer.bindPopup(`<table class="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tr>
      <th scope="row">county</th>
      <td>${feature.properties.COUNTY}</td>
   
    </tr>
    <tr>
      <th scope="row">population</th>
      <td>${feature.properties.Pop2016}</td>
   
    </tr>
    <tr>
      <th scope="row">Cases per 100k in the last 14 days</th>
      <td>${feature.properties.P14_100k}</td>
   
    </tr>
`);
    
}
const fillBlueOptions = { fillColor: 'blue' }

    class LeafletMap extends Component {
        state={
             lat: null,
      lng: null,
      zoom: 7,
      isMapInit: false
        }
       
   
     componentDidMount() {
         
    navigator.geolocation.getCurrentPosition((position) =>{
     
      this.setState({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    });
    });
    const map = this.map.leafletElement && map.current.leafletElement.getBounds();;
  
    if(map!=null){
     const searchControl = new ELG.Geosearch().addTo(this.map);
    const results = new L.LayerGroup().addTo(this.map);
    
    searchControl.on("results", function(data) {
      results.clearLayers();
      for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
      }
    });}
  }
    saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true
    });
   
  
  };
render(){
  if(this.map!=null){
     
  }

  

    return (
      <div>
              <br />
                            <br />
              
              
              <Grid container spacing={1}>

            <Grid item sm={3} xs={12} spacing={1}  >
      </Grid>
            <Grid item sm={9} xs={12} spacing={1}  >

        <Map className='map' center={[53.305, -7.177]} zoom={8} ref={this.saveMap} scrollWheelZoom={true} ref={m => {
          this.leafletMap = m;
        }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {this.state.isMapInit && <Routing map={this.map} />}

        <Circle center={this.state.lat!=null?[this.state.lat, this.state.lon]:[53.305, -7.177]} pathOptions={fillBlueOptions} radius={5000} />



        {getGeoJSONComponent()}        
      </Map>
            </Grid>

      </Grid>
            </div>

    )

    }
}
export default LeafletMap