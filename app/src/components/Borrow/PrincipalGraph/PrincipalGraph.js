import React from 'react';
import { Line } from 'react-chartjs-2';

// const state = {
//   labels: ['January', 'February', 'March',
//            'April', 'May'],
//   datasets: [
//     {
//       label: 'Title',
//       fill: false,
//       lineTension: 0.5,
//       backgroundColor: 'rgba(0,200,255,1)',
//       borderColor: 'rgba(0,200,255,1)',
//       borderWidth: 2,
//       data: [65, 59, 80, 81, 56]
//     }
//   ]
// }

export default class PrincipalGraph extends React.Component {
  render() {

    var data = {
        // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        labels: this.props.months,
        datasets: [
          {
            label: "Principal",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(0,200,255,1)",
            borderColor: "rgba(0,200,255,1)", // The main line color
            borderCapStyle: 'square',
            borderDash: [], // try [5, 15] for instance
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "black",
            pointBackgroundColor: "white",
            pointBorderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "yellow",
            pointHoverBorderColor: "brown",
            pointHoverBorderWidth: 2,
            pointRadius: 0, // 4
            pointHitRadius: 10,
            // notice the gap in the data and the spanGaps: true
            // data: [65, 59, 80, 81, 56, 55, 40, ,60,55,30,78],
            data: this.props.principalBalances,
            spanGaps: true,
          },
        ]
      };

      var options = {
        scales: {
          yAxes: [{
              ticks: {
                beginAtZero:true
              },
              scaleLabel: {
                display: true,
                labelString: 'Moola',
                fontSize: 20
              }
          }]
        },
        responsive: true,
        maintainAspectRatio: false,
      };


    return (
      <Line
        data={data}
        options={options}
        height={400}
      />
    );
  }
}