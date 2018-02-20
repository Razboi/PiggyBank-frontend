import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Line } from "react-chartjs-2";
import { Container, Table, Button } from "semantic-ui-react";
import styled from "styled-components";
import axios from "axios";

const MainWrapper = styled( Container )`
	width: 90% !important;
`;

const TransactionsTable = styled( Table )`
	margin-top: 80px !important;
`;

const TransactionsButton = styled( Button )`
	display: block !important;
	margin: 0px auto !important;
	width: 200px;
`;

class HomePage extends React.Component {
	constructor() {
		super();
		this.state = {
			transactions: []
		};
	}
	componentWillMount () {
		axios.get("/api/balances/", { "headers": { "Authorization": "Token " + localStorage.token }
	}).then( res => this.setState({ transactions: res.data }) )
		.catch( err => console.log( err ) );
	}

	render() {
		const dataChart = {
			labels:this.state.transactions.length > 0 && this.state.transactions.map(
				transaction => transaction.date.split("T")[ 0 ] ),
			datasets: [
				{
					label: "Balance",
					data:this.state.transactions.length > 0 && this.state.transactions.map(
						transaction => parseFloat( transaction.transaction_balance ) ),
					borderColor: [
                "#F490C0"
            ],
					backgroundColor: [ "#F4A7C0" ]
				}
			]
			};

		const chartOptions = {
			scales: {
				yAxes: [ {
					ticks: {
						beginAtZero: true
					}
				} ]
			}
		};

		return (
			<MainWrapper fluid={true}>
				{ this.props.isAuthenticated &&
					<span onClick={this.props.logout}>logout</span>
				}
				<Line
					data={dataChart}
					options={chartOptions}
					height={110}
				/>
				<Container>
					<TransactionsTable celled>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Date</Table.HeaderCell>
								<Table.HeaderCell>Description</Table.HeaderCell>
								<Table.HeaderCell>Amount</Table.HeaderCell>
								<Table.HeaderCell>Balance</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{this.state.transactions.map( (transaction, index) =>
								<Table.Row key={index}>
									<Table.Cell>{transaction.date.split("T")[ 0 ]}</Table.Cell>
									<Table.Cell>{transaction.description}</Table.Cell>
									<Table.Cell>{transaction.amount}</Table.Cell>
									<Table.Cell>{transaction.transaction_balance}</Table.Cell>
								</Table.Row>
							)}
						</Table.Body>
						<Table.Footer>
							<Table.Row>
								<Table.HeaderCell colSpan="4">
									<TransactionsButton onClick={this.getTransactions} primary>See all</TransactionsButton>
								</Table.HeaderCell>

							</Table.Row>

						</Table.Footer>
					</TransactionsTable>
				</Container>
			</MainWrapper>
		);
	}
}

HomePage.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

function mapStateToProps( state ) {
	return {
		isAuthenticated: !!state.user.token
	};
}

export default connect( mapStateToProps, { logout })( HomePage );
