import React, { Component, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import '../../layout/layout.css';
import TickerSelection from '../../components/autoCombo';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import PortfolioVsBenchmark from '../Charts/portfolioVsBenchmark';

class TempLevelChange extends Component {
    constructor(props) {
        super(props);
        this.state = {TempLevel: "", TempLevels:[]};
      }
    
      componentDidMount() {
           
      }
      
    handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/calculate_temp_change_impact?' + new URLTemprchParams({
            tempLevel: this.state.TempLevel,
        }))
        .then(result => alert("Added Successfully"))       
   }
    
    handleChange = (value) => {
        this.state.TempLevel = value.code;
      }

      render() {   
        const { classes } = this.props;
        const TempLevels = [
            { code: '.5', label: '.5 degree increase'},
            { code: '1', label: '1 degree increase' },
            { code: '1.5', label: '1.5 degree increase' },
        ];

        return (
            <form>
                <Grid container spacing={2}>
                    <Grid item md={4} >
                        <Autocomplete
                            id="Templevel-select"
                            //value={value}
                            onChange= {(event, value) => this.handleChange(value)}
                            style={{ width: 500 }}
                            options={tickers}
                            
                            autoHighlight
                            getOptionLabel={(option) => option.label}
                            renderOption={(option) => (
                            <React.Fragment>
                                <span style={{marginRight: 15, fontSize: 18}}>{option.code}</span>
                                {option.label} ({option.code})
                            </React.Fragment>
                            )}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Choose a Temp level increase"
                                variant="outlined"
                                inputProps={{
                                ...params.inputProps,
                                autoComplete: '', // disable autocomplete and autofill
                                }}
                            />
                            )}
                        />
                    </Grid>
                    <Grid item md={4}>
                        <Button type="submit" variant="contained" onClick={this.handleSubmit}>Calculate Impact</Button>
                    </Grid>
                    <Grid item md={4}></Grid>
                    <Grid item md={12}>
                        <div className='halfHeight-div'>
                            <PortfolioVsBenchmark></PortfolioVsBenchmark>
                        </div>
                    </Grid>
                </Grid>
            </form>
          );
      }
}

export default (TempLevelChange);