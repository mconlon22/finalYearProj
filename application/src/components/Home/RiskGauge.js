import * as React from 'react';
import Paper from '@material-ui/core/Paper';

import axios from 'axios';
import Chart from "react-google-charts";
import Component from "react-google-charts";





export default class Graph extends React.Component {
 state = { areaData : [] ,position:null,  memory: 0,
    cpu: 55,
    network: 0,
    intervalID: null,};
    

  
      componentDidMount() {
        var position=[]
         navigator.geolocation.getCurrentPosition((position)=> {
    
      position=position



    axios.get(`http://127.0.0.1:5000/getLocalData?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
      .then(res => {
        var data = res.data;
        console.log(areaData)
        var areaData=[]
        for (var i=0; i<data.length-1; i++){
            areaData.push([new Date(data[i].date),data[i].amount])
        }
        areaData.sort((a,b)=>a[0].getTime()-b[0].getTime());
      for (var i=0; i<data.length-1; i++){
            areaData[i][0]=areaData[i][0].toISOString().slice(5,10).replace('-','/')
        }
        areaData.location=data[0].location
        areaData.unshift(['Date','Cases per 100k'])
        this.setState({ areaData });

    });
      })
      }
    render() {
      const options = {
 title: `Cases In ${this.state.areaData.location}`,
   curveType: "function",
  legend: { position: "bottom" }
};
        return (


      <Chart
        width={400}
        height={120}
        chartType="Gauge"
        loader={<div>Loading Chart</div>}
        data={[
          ['Label', 'Value'],
          ['Personal', this.state.memory],
          ['Location', this.state.memory],
          ['Total', this.state.memory],


         
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
    
  
  )
  }
}
