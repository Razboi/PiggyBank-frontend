import React from "react";
import { Bar } from "react-chartjs-2";


class TransChart extends React.Component {

	render() {
		const dataChart = {
			labels:this.props.transactions.length > 0 && this.props.transactions.map(
				transaction => transaction.date.split("T")[ 0 ] ),
			datasets: [ {
					label: "Balance",
					borderColor: "#F4A7C0",
					backgroundColor: "rgba(244, 144, 192, 0.5)",
					data:this.props.transactions.length > 0 && this.props.transactions.map(
						transaction => parseFloat( transaction.currentTotal ) )
				} ]
			};

		const chartOptions = {
			scales: {
				yAxes: [ {
					ticks: { beginAtZero: true }
				} ]
			},
			legend: {
				display: false
			}
		};
		var chartHeight = this.props.smallDevice ? 200 : 110;
		return (
			<Bar
				data={dataChart}
				options={chartOptions}
				height={chartHeight}
			/>
		);
	}
}


export default TransChart;
