import React from "react";
import { Bar } from "react-chartjs-2";

class TransChart extends React.Component {
	render() {
		const dataChart = {
			labels:this.props.transactions.length > 0 && this.props.transactions.map(
				transaction => transaction.date.split("T")[ 0 ] ),
			datasets: [ {
					label: "Balance",
					borderColor: "#F490C0",
					backgroundColor: "#F4A7C0",
					data:this.props.transactions.length > 0 && this.props.transactions.map(
						transaction => parseFloat( transaction.currentTotal ) )
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
			<Bar
				data={dataChart}
				options={chartOptions}
			/>
		);
	}
}


export default TransChart;
