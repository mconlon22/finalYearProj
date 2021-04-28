import * as React from 'react';
import Paper from '@material-ui/core/Paper';

import axios from 'axios';
import Chart from "react-google-charts";




export default class Graph extends React.Component {
 state = { areaData : [] ,position:null};
    

  
      componentDidMount() {
        var position=[]
        console.log('this aint working')
         navigator.geolocation.getCurrentPosition((position)=> {
          console.log('working')
      position=position



    axios.get(`https://exams.irish/data/getLocalData?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
      .then(res => {
        var data = res.data;

        var areaData=[]
          var locations=[]
        for(var x=0;x<data.length;x++){
        var singlearea=[]
        for (var i=0; i<data[x].length-1; i++){
            singlearea.push([new Date(data[x][i].EXPR_1),data[x][i].value])
        }

        singlearea.sort((a,b)=>a[0].getTime()-b[0].getTime());
        areaData.push(singlearea)
        locations.push(data[x][i].ENGLISH)
        }
        console.log(areaData,locations)
                 for(var x=0;x<areaData.length;x++){

      for (var i=0; i<areaData[x].length; i++){
            areaData[x][i][0]=areaData[x][i][0].toISOString().slice(5,10).replace('-','/')
        }
        }
        var finalArray=[]
        finalArray[0]=['date']
        for(const location in locations){
          finalArray[0].push(locations[location])
        }

        for(var x=0;x<areaData.length;x++){
          for (var i=0;i<areaData[x].length;i++){
            if(finalArray[i+1]!=null){
            finalArray[i+1].push(areaData[x][i][1])
            }
            else{
              finalArray[i+1]=[]
              finalArray[i+1].push(areaData[x][i][0])
              finalArray[i+1].push(areaData[x][i][1])

              }
            }
          }
        console.log(finalArray)

        areaData.locations=locations
        areaData.unshift(['Date','Cases per 100k'])
        window.localStorage.setItem('locationRisk',Math.round((finalArray[finalArray.length-1][1]/200)*10)/10)
        console.log(window.localStorage.getItem('locationRisk'))
        console.log(areaData)

        this.setState({ areaData:finalArray });

    });
    
    

      })}
               

    render() {
      const options = {
 title: `Cases Per 100k`,
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
