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
    locationRisk:0
  }

  componentDidMount() {
    
    axios.get(`http://127.0.0.1:5000/getCovid`)
      .then(res => {
        const covidData = res.data[0];
        console.log(covidData)
        covidData.date=covidData.date.split('T')[0]
                this.setState({ covidData });

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
          <Typography className={useStyles.paper} variant="h4" component="h2" >Stats {this.state.covidData.date}</Typography>
           </Grid>
            <Grid item xs={3} spacing={1} sm={6} >
           </Grid>
             <Grid item xs={6} spacing={1} sm={12}>
          <Typography variant="h6" component="h2" >Cases:                {this.state.covidData.todaysCases}</Typography>
           </Grid>
            <Grid item xs={12} spacing={1} sm={12}>
          <Typography variant="h6" component="h2" >ICU Admissions:  {this.state.covidData.todaysIcu}</Typography>
           </Grid>
            <Grid item xs={3} spacing={1} sm={9} >
           </Grid>
            <Grid item xs={12} spacing={1} sm={12}>
          <Typography variant="h6" component="h2" >Deaths: {this.state.covidData.todaysDeaths}</Typography>
           </Grid> 
            <Grid item xs={3} spacing={1} sm={9} >
           </Grid>
           <Grid item xs={12} spacing={1} sm={12}>
          <Typography variant="h6" component="h2" >Total Vaccienes Given:{this.state.covidData.total}</Typography>
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