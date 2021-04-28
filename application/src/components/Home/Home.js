import React from 'react';

import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Chart } from 'react-charts'
import Graph from './Graph';
import RiskGauge from './RiskGauge'
        import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

   
export default class Home extends React.Component {
  state = {
    covidData: [],
    personalRisk:0,
    locationRisk:0,
    dateStr:null,
    deaths:null,
    cases:null,
    icu:null,
    totalvac:null
  }

  componentDidMount() {
    
    axios.get(`https://exams.irish/data/getCovid`)
      .then(res => {
        const covidData = res.data[0];
        console.log(covidData)
        covidData.date=covidData.date.split('T')[0]
                this.setState({ covidData });

      })
      axios.get('https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIreland_DailyDateView/FeatureServer/0/query?f=json&where=1%3D1&outFields=*&returnGeometry=false&outStatistics=%5B%7B%22onStatisticField%22%3A%22Date%22%2C%22outStatisticFieldName%22%3A%22Date_max%22%2C%22statisticType%22%3A%22max%22%7D%5D')
      .then((res)=>{
        const epoch=res.data.features[0].attributes.Date_max
        var d = new Date(epoch); 
        const dateStr=d.toISOString().slice(0,10)
        console.log(dateStr)
        this.setState({dateStr})
      })

      axios.get('https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19StatisticsProfileHPSCIrelandView/FeatureServer/0/query?f=json&where=1%3D1&outFields=*&returnGeometry=false&outStatistics=%5B%7B%22onStatisticField%22%3A%22ConfirmedCovidCases%22%2C%22outStatisticFieldName%22%3A%22ConfirmedCovidCases_sum%22%2C%22statisticType%22%3A%22sum%22%7D%5D')
      .then((res)=>{
        const cases=res.data.features[0].attributes.ConfirmedCovidCases_sum
        console.log('cases',cases)
        
        this.setState({cases})
      })
      axios.get('https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19StatisticsProfileHPSCIrelandView/FeatureServer/0/query?f=json&where=1%3D1&outFields=*&returnGeometry=false&outStatistics=%5B%7B%22onStatisticField%22%3A%22ConfirmedCovidDeaths%22%2C%22outStatisticFieldName%22%3A%22ConfirmedCovidDeaths_max%22%2C%22statisticType%22%3A%22max%22%7D%5D')
      .then((res)=>{
        const deaths=res.data.features[0].attributes.ConfirmedCovidDeaths_max
        this.setState({deaths})
      })
      axios.get('https://services-eu1.arcgis.com/z6bHNio59iTqqSUY/arcgis/rest/services/ICUBISCurrentTimelinePublicView/FeatureServer/0/query?f=json&where=1%3D1&outFields=*&returnGeometry=false&outStatistics=%5B%7B%22onStatisticField%22%3A%22ncovidconf%22%2C%22outStatisticFieldName%22%3A%22ncovidconf_sum%22%2C%22statisticType%22%3A%22sum%22%7D%5D')
      .then((res)=>{
        const icuAdmis=res.data.features[0].attributes.ncovidconf_sum
        
        this.setState({icu:icuAdmis})
      })
      axios.get('https://services-eu1.arcgis.com/z6bHNio59iTqqSUY/arcgis/rest/services/Covid19_Vaccine_Administration_Hosted_View/FeatureServer/0/query?f=json&where=1%3D1&outFields=*&returnGeometry=false&outStatistics=%5B%7B%22onStatisticField%22%3A%22totalAdministered%22%2C%22outStatisticFieldName%22%3A%22totalAdministered_max%22%2C%22statisticType%22%3A%22max%22%7D%5D')
      .then((res)=>{
        const totalvac=res.data.features[0].attributes.totalAdministered_max
        
        this.setState({totalvac:totalvac})
      })

    }
  

  render() {
      const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        paper: {
          padding: theme.spacing(1), //grid padding
          textAlign: 'left',
          color: theme.palette.text.secondary,
          marginLeft:0,
        },
      }));
      const section = {
  height: "25%",
  paddingTop: 5,
  backgroundColor: "#fff"
};
    return (
      <div>
        <br/>

                  <Typography variant="h6" component="h2" >Your Risk Levels</Typography>
            <Grid container spacing={1}>
                        <Grid item sm={5} xs={0} spacing={1}  >
           </Grid>

            <Grid item xs={9} spacing={5} sm={7} >

            <RiskGauge personalRisk={this.state.personalRisk} locationRisk={this.state.locationRisk}/>
           </Grid>
          
            <Grid item sm={12} xs={12} spacing={1}  >
          <Typography className={useStyles.paper} variant="h4" component="h2" >Stats {this.state.dateStr!=null?this.state.dateStr:<div></div>}</Typography>
           </Grid>
            <Grid item xs={3} spacing={1} sm={6} >
           </Grid>
             <Grid item xs={6} spacing={1} sm={12}>
          <Typography variant="h6" component="h2" >Cases:                {this.state.cases!=null?this.state.cases:<div></div>}</Typography>
           </Grid>
            <Grid item xs={12} spacing={1} sm={12}>
          <Typography variant="h6" component="h2" >ICU Admissions:  {this.state.icu!=null?this.state.icu:<div></div>}</Typography>
           </Grid>
            <Grid item xs={3} spacing={1} sm={9} >
           </Grid>
            <Grid item xs={12} spacing={1} sm={12}>
          <Typography variant="h6" component="h2" >Deaths: {this.state.deaths!=null?this.state.deaths:<div></div>}</Typography>
           </Grid> 
            <Grid item xs={3} spacing={1} sm={9} >
           </Grid>
           <Grid item xs={12} spacing={1} sm={12}>
          <Typography variant="h6" component="h2" >Total Vaccienes Given:{this.state.totalvac!=null?this.state.totalvac:<div></div>}</Typography>
           </Grid>
           
            <Grid item xs={3} spacing={1} sm={2} >
           </Grid>
           <Grid item xs={12} spacing={1} sm={10}>
          
         
          </Grid>
           <Grid item xs={3} spacing={1} sm={3} >
           </Grid>
                     <Grid item xs={12} spacing={1} sm={9}  >

                          <Graph style={section}/>
                         

                               </Grid>


        </Grid>

      </div>
    )
  }
}