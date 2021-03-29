import * as React from 'react';
import Paper from '@material-ui/core/Paper';

import axios from 'axios';
import Chart from "react-google-charts";
import Component from "react-google-charts";
import { Button } from '@material-ui/core';

import {withRouter} from 'react-router-dom';


function handleClick() {
  
}


class Graph extends React.Component {
 state = { personalRisk:0,locationRisk:0};

 
 componentDidMount() {
   var position=[]
    navigator.geolocation.getCurrentPosition((position)=> {
 position=position
 })
 }
 
 render() {
      handleClick=() => {
        console.log('working')
        this.props.history.push('/Calculator') 
      }
        
      
  console.log(window.localStorage.getItem('userRisk'))
this.state.locationRisk=window.localStorage.getItem("locationRisk")!=null?this.state.locationRisk=Number(window.localStorage.getItem("locationRisk")):this.state.locationRisk=0
this.state.personalRisk=window.localStorage.getItem("userRisk")!=null?this.state.personalRisk=Number(window.localStorage.getItem("userRisk")):this.state.personalRisk=0

const locationRisk=this.state.locationRisk
const personalRisk=this.state.personalRisk
if(personalRisk!=null&&locationRisk!=null){
  console.log('big fat cock')
  this.state.total= locationRisk+personalRisk/2
}
else{
  this.state.total=0
}
const total=this.state.total

console.log(typeof Number(locationRisk),typeof Number(personalRisk),typeof total)

        return (
<div>


      <Chart
        width={400}
        height={120}
        chartType="Gauge"
        loader={<div>Loading Chart</div>}
        data={[
          ['Label', 'Value'],
          ['Personal', personalRisk],
          ['Location', locationRisk],
          ['Total', total]
        ]}
        options={{
          majorTicks:1,
          max:5,
          greenFrom:0,
          greenTo:1.5,
          redFrom: 3.5,
          redTo: 5,
          yellowFrom: 1.5,
          yellowTo: 3.5,
          minorTicks: 5,
        }}
        rootProps={{ 'data-testid': '1' }}
      />
                {personalRisk == null?<Button variant="contained" color="primary" onClick={handleClick}>Calculate Personal Risk</Button>:<div></div>}

    </div>
  
  )
  }
}
export default withRouter(Graph)