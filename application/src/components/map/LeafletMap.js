

import React,{ Component } from 'react'
import {Map,TileLayer,Popup,Marker,GeoJSON ,Circle} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import data from './Covid19_LEACases_Mapped.json'
import Routing from "./RoutingMachine";
import MapInfo from "./MapInfo";
import * as ELG from "esri-leaflet-geocoder";
import Grid from '@material-ui/core/Grid';
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import LeafletControlGeocoder from "./LeafletControlGeocoder";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Typography from '@material-ui/core/Typography';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
 

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
      zoom: 7,
      isMapInit: false,
      from:{lat:53.30001,lng:-6.1778},
      to:{lat:53.30002,lng:-6.1778}
        }
        setAddressTo=(value) =>{
          console.log(value);
          this.state.value = value;
          geocodeByAddress(value.label)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) =>{
                    console.log('to')

                    if(lat!=null&&lng!=null){

                this.setState({to: {lat: lat, lng: lng}})
                console.log(this.state.to)
                    }
        })
        }
         setAddressFrom=(value) =>{
        console.log(value);
          this.state.value = value;
          geocodeByAddress(value.label)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) =>{
          console.log('from')
          if(lat!=null&&lng!=null){
                this.setState({from: {lat: lat, lng: lng}})
                  console.log(typeof lat)

          }
        })
        }

       
   
     componentDidMount() {
         
    navigator.geolocation.getCurrentPosition((position) =>{
     
      this.setState({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    });
    });
    
    const map = this.map

   
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
                       

              
              <Grid container spacing={1}>

            <Grid item sm={3} xs={12} spacing={1}  >
      </Grid>
            <Grid item sm={9} xs={12} spacing={1}  >
             <Grid item sm={2} xs={12} spacing={1}  >
            <Typography variant="h6" component="h2" justify="flex-end">From</Typography>
      </Grid>

                      <GooglePlacesAutocomplete apiKey="AIzaSyDp3YVDuLumOSd_jdEUxeDkN4g1fkWR9Vk" selectProps={{
    
          onChange: this.setAddressFrom,
        }}/>
                       <Grid item sm={2} xs={12} spacing={1}  >
            <Typography variant="h6" component="h2" justify="flex-end">To</Typography>
      </Grid>

                      <GooglePlacesAutocomplete apiKey="AIzaSyDp3YVDuLumOSd_jdEUxeDkN4g1fkWR9Vk" selectProps={{
    
          onChange: this.setAddressTo,
        }}
 />
                            <br />
                           

        <Map className='map' center={[53.305, -7.177]} zoom={8} ref={this.saveMap} scrollWheelZoom={true} >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {this.state.isMapInit && <Routing map={this.map} from={this.state.from} to={this.state.to} />}

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