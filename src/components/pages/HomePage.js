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
			labels: [ "First", "Second", "Third", "Fourth" ],
			datasets: [
				{
					label: "Balance",
					data:[
						130,
						120,
						300,
						4000
					],
					borderColor: [
                "#F490C0"
            ],
					backgroundColor: [ "#F4A7C0" ]
				}
			]
		};
		console.log(this.state);
		return (
			<MainWrapper fluid={true}>
				{ this.props.isAuthenticated &&
					<span onClick={this.props.logout}>logout</span>
				}
				<Line
					data={dataChart}
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
							{this.state.transactions.map( transaction =>
								<Table.Row>
									<Table.Cell>{transaction.date}</Table.Cell>
									<Table.Cell>{transaction.description}</Table.Cell>
									<Table.Cell>{transaction.amount}</Table.Cell>
									<Table.Cell>{transaction.balance}</Table.Cell>
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
