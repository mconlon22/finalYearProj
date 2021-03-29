import * as React from 'react';
import Paper from '@material-ui/core/Paper';

import axios from 'axios';
import Chart from "react-google-charts";




export default class Graph extends React.Component {
 state = { areaData : [] ,position:null};
    

  
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

  <Paper>
     <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={this.state.areaData}
          options={options}
        />
  </Paper>
  )
  }
}