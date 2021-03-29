

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Typography from '@material-ui/core/Typography';

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
   button: {
    marginTop: theme.spacing(2),
    padding: '0 30px',
      height: 60,

  },
}));
const Calculator=()=>{
     const classes = useStyles();
  const [age, setAge] = React.useState('');
    const [redirect, setRedirect] = React.useState(false);

    const [sex, setSex] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [smoking, setSmoking] = React.useState('');
  const [ethnicity, setEthnicity] = React.useState('');


  const handleAge = (event) => {
    setAge(event.target.value);
  };
  const calculateRisk = (event) => {
      setRedirect(true)
  };
  const handleSex = (event) => {
    setSex(event.target.value);
  };
  const handleHeight = (event) => {
    setHeight(event.target.value);
  };
  const handleWeight = (event) => {
    setWeight(event.target.value);
  };
  const handleSmoking = (event) => {
    setSmoking(event.target.value);
  };
  const handleEthnicity = (event) => {
    setEthnicity(event.target.value);
  };

     if (redirect) {
       return  <Redirect  to="/Map" />;
     }
    return (
            <div>
          <br/>
          <Typography variant="h2" component="h2">Covid Risk Calculator</Typography>
                   <Typography variant="body1" component="h2">This was developed as part of my final year project. The source code is available </Typography>


<br/>
<br/>

      <Grid container spacing={1}>
                        <Grid item sm={3} xs={0} spacing={1}  >
           </Grid>
            <Grid item xs={3} spacing={3} sm={3} >
             <Typography variant="body1" component="h2"> What age are you</Typography>
        </Grid>
<Grid item xs={8}  sm={6}>
       <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={age}
          onChange={handleAge}
        >
         
          <MenuItem value={20}>18–39</MenuItem>
          <MenuItem value={45}>40–49</MenuItem>
          <MenuItem value={55}>50–59</MenuItem>
          <MenuItem value={65}>60–69</MenuItem>
          <MenuItem value={75}>70–79</MenuItem>
        <MenuItem value={85}>80+</MenuItem>


        </Select>
      </FormControl>
        </Grid>
 <Grid item sm={3} xs={0} spacing={1}  >
           </Grid>
            <Grid item xs={3} spacing={3} sm={3} >             <Typography variant="body1" component="h2"> What gender are you</Typography>
        </Grid>
<Grid item xs={8}  sm={6}>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={sex}
          onChange={handleSex}
        >
         
          <MenuItem value={"male"}>Male</MenuItem>
          <MenuItem value={"female"}>Female</MenuItem>
        </Select>
      </FormControl>

        </Grid>
  <Grid item sm={3} xs={0} spacing={1}  >
           </Grid>
            <Grid item xs={3} spacing={3} sm={3} >             <Typography variant="body1" component="h2"> What weight are you</Typography>
        </Grid>
<Grid item xs={8}  sm={6}>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Weight</InputLabel>
        <Input
            id="standard-adornment-weight"
            value={weight}
            onChange={handleWeight}
            endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
      </FormControl>
        </Grid>
 <Grid item sm={3} xs={0} spacing={1}  >
           </Grid>
            <Grid item xs={3} spacing={3} sm={3} >             <Typography variant="body1" component="h2"> What height are you</Typography>
        </Grid>
<Grid item xs={8}  sm={6}>
      
<FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Height</InputLabel>
        <Input
            id="standard-adornment-weight"
            value={height}
            onChange={handleHeight}
            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
      </FormControl>
        </Grid>
 <Grid item sm={3} xs={0} spacing={1}  >
           </Grid>
            <Grid item xs={3} spacing={3} sm={3} >             <Typography variant="body1" component="h2"> What is your smoking status</Typography>
        </Grid>
<Grid item xs={8}  sm={6}>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label"></InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={smoking}
          onChange={handleSmoking}
        >
         
          <MenuItem value={'current'}>Current</MenuItem>
          <MenuItem value={'former'}>Former</MenuItem>
          <MenuItem value={'never'}>Never</MenuItem>
        </Select>
      </FormControl>
        </Grid>
 <Grid item sm={3} xs={0} spacing={1}  >
           </Grid>
            <Grid item xs={3} spacing={3} sm={3} >             <Typography variant="body1" component="h2"> What ethnicity are you</Typography>
        </Grid>
<Grid item xs={8}  sm={6}>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Ethnicity</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={ethnicity}
          onChange={handleEthnicity}
        >
         
          <MenuItem value={'white'}>white</MenuItem>
          <MenuItem value={'mixed'}>mixed</MenuItem>
          <MenuItem value={'south asian'}>south asian</MenuItem>
                    <MenuItem value={'black'}>black</MenuItem>
          <MenuItem value={'other'}>other</MenuItem>

        </Select>
      </FormControl>
      <Grid item xs={12}>
<Button   className={classes.button} variant="contained" color="primary" onClick={calculateRisk} disableElevation>
  Calculate Risk
</Button>
        </Grid>

        </Grid>

      </Grid>

    </div>
  );
    
}
export default Calculator;