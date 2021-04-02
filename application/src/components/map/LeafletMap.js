

import React,{ Component } from 'react'
import {Map,TileLayer,Popup,Marker,GeoJSON ,Circle,Polyline} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import Routing from "./RoutingMachine";
import * as ELG from "esri-leaflet-geocoder";
import Grid from '@material-ui/core/Grid';
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import LeafletControlGeocoder from "./LeafletControlGeocoder";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Typography from '@material-ui/core/Typography';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import axios from 'axios'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


var data=null
var loaded=false
function getData(){
 
}
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
  const max=getMax()
  const min=getMin()
  const range=max-min

    var x=((num-min)/range)*100
    if(num>max){x=100}
    return x
}
function getGeoJSONComponent (){
 
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

const from={
  lat:53.3069845,lng:-6.206675120805812
}
const to={
  lat:53.3018309,lng:-6.179926367800741
}
const fillBlueOptions = { fillColor: 'blue' }

class LeafletMap extends Component {
  state={
    zoom: 7,
    isMapInit: false,
    from:{lat:null,lng:null},
    to:{lat:null,lng:null},
    routeData:null,
    routeCovidData:null
  }
  getRoutingData=()=>{
    var params={params:{
      apiKey:'z_s-RkrD1pso_3asPKR-ZTJuSBe7bQhjqp46h-VDmQ0',
      waypoint0:'geo!'+this.state.from.lat.toString()+','+this.state.from.lng.toString(),
      waypoint1:'geo!'+this.state.to.lat.toString()+','+this.state.to.lng.toString(),
      mode:'fastest;car;traffic:disabled',
      avoidareas:'',
      return: 'polyline'
  }
    }
    var routeData=[]
    var routeLocationData=[]
    axios.get("https://route.ls.hereapi.com/routing/7.2/calculateroute.json?",params)
    .then((res)=>{
    var response=res.data.response.route[0].leg[0].maneuver
    for(var x=0;x<response.length-1;x++){
      const val=response[x].position
      console.log(val)
      routeLocationData.push({lat:val.latitude,lon:val.longitude})
      
    }
    console.log(routeLocationData)
   for(var i=1;i<response.length-1;i++){
     const from=response[i-1].position
     const to=response[i].position
    
      routeData.push({
        from_lat: from.latitude,
        from_long:from.longitude,
        id: to.id,
        to_lat: to.latitude,
        to_long: to.longitude,
      })
    }
    params={
      params:{
        locations:routeLocationData
        }}
    axios.get(`http://127.0.0.1:5000/getRoute`,params)
      .then(res => {
        console.log(res.data)
        this.setState({routeCovidData:res.data})
  
      })
    console.log(routeData)
    this.setState({routeData})
      
    })
    
  
  }
        setAddressTo=(value) =>{
          geocodeByAddress(value.label)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) =>{

                    if(lat!=null&&lng!=null){

                this.setState({to: {lat: lat, lng: lng}},() => {
                  if(this.state.from.lat!=null){
                    this.getRoutingData()
                  }
                })
                    }
        })
        }
         setAddressFrom=(value) =>{
          geocodeByAddress(value.label)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) =>{
          if(lat!=null&&lng!=null){
                this.setState({from: {lat: lat, lng: lng}},() => {
                  if(this.state.to.lat!=null){
                    this.getRoutingData()
                  }
                })
          }
        })
        }

       
   
     componentDidMount() {
      axios.get("https://opendata.arcgis.com/datasets/27d401c9ae084097bb1f3a69b69462a1_0.geojson").then((res)=>{
        data=res.data
        loaded=true
      })
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
            <Card> 
                  <CardContent>
                            <Typography>
                            This Route Passes Through
          </Typography>
          <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell align="right">Covid Level Per 100k</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>



       </TableBody>
      </Table>
    </TableContainer>
      {this.state.routeCovidData!=null?this.state.routeCovidData.map((data)=>{
        return (
          <TableRow key={data.location}>
              <TableCell component="th" scope="row">
                {data.location}
              </TableCell>
              <TableCell align="right">{data.amount}</TableCell>
          
            </TableRow>
        )
      }):<div></div>

      }

      </CardContent>
            </Card>
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


        <Circle center={this.state.lat!=null?[this.state.lat, this.state.lon]:[53.305, -7.177]} pathOptions={fillBlueOptions} radius={5000} />



        {loaded?getGeoJSONComponent():<div></div>}   
        {this.state.from.lat!=null&&this.state.to.lat!=null&&this.state.routeData!=null?
        this.state.routeData.map(({id, from_lat, from_long, to_lat, to_long}) => {
          return <Polyline key={id} positions={[
            [from_lat, from_long], [to_lat, to_long],
          ]} color={'blue'} />
          }):<div></div>}     
      </Map>
            </Grid>

      </Grid>
            </div>

    )

    }
}
export default LeafletMap