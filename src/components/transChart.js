import React from "react";
import { Line } from "react-chartjs-2";

class TransChart extends React.Component {
	render() {
		const dataChart = {
			labels:this.props.transactions.length > 0 && this.props.transactions.map(
				transaction => transaction.date.split("T")[ 0 ] ),
			datasets: [ {
					label: "Balance",
					data:this.props.transactions.length > 0 && this.props.transactions.map(
						transaction => parseFloat( transaction.currentTotal ) ),
					borderColor: [
                "#F490C0"
            ],
					backgroundColor: [ "#F4A7C0" ]
				} ]
			};

		const chartOptions = {
			scales: {
				yAxes: [ {
					ticks: { beginAtZero: true }
				} ]
			}
		};
		return (
			<Line
				data={dataChart}
				options={chartOptions}
				height={110}
			/>
		);
	}
}


export default TransChart;
