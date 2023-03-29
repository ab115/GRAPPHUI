import React, { Component, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import '../../layout/layout.css';

class ClimateImpact extends Component {
  constructor(props) {
    super(props);
    this.state = {grDataBM: [], grDataPF: [], grLabels: [], shouldRefresh: "-1"};
  }

  shouldComponentUpdate(nextProps) {
    // Rendering the component only if
    // passed props value is changed
    if (this.props.showImpact === null) return false;
    if (this.state.shouldRefresh !== this.props.showImpact) {
      this.state.shouldRefresh = this.props.showImpact;
      return true;
    } else {
      return false;
    }
  }

  componentDidMount() {

    fetch('http://localhost:5000/portfolioVsImpact')
    .then((res) => res.json()
    .then((data) => {
            this.setState({ grDataBM: data.gDataBM, 
                            grDataPF: data.gDataPF,
                            grLabels: data.gLabels })                        
          })
      );     
  }
    
  render() {
    let gData = {
      labels: this.state.grLabels,
      datasets: [        
          {
            label: 'Portfolio',
            data: this.state.grDataPF,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
          {
            label: 'Impact On Portfolio',
            data: this.state.grDataBM,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
          },
      ]
    };
    
    let options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    return (
      <div className='impactChart-div'>
          <Line data={gData} options={options} />
      </div>
    );
  }
}

export default ClimateImpact;