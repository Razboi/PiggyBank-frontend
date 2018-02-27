import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Container, Button } from "semantic-ui-react";
import styled from "styled-components";
import axios from "axios";

import TransChart from "../transChart";
import TransTable from "../transTable";
import CreateTransactionsForm from "../forms/createTransaction";

const MainWrapper = styled.div`
	font-family: 'Ubuntu', sans-serif !important;
	width: 100%;
	margin: 0px auto;
	background: #fff;
	@media (min-width: 600px) {
		padding-bottom: 20px;
	}
`;

const CurrentBalance = styled.span`
	color: #fff;
	font-size: 25px;
	align-self: center;
	@media (max-width: 600px) {
		font-size: 22px;
	}
`;

const TableContainer = styled( Container )`
	margin: 0px !important;
`;

const Header = styled.header`
	padding: 45px 0px;
	background: linear-gradient(#8DEEA7, #7ED495, #71BF86);
	border-bottom: solid 1.5px #6AB27D;
	@media (min-width: 600px) {
		background: #fff;
		border: none;
		padding: 60px 0px 40px 0px;
		span {
			color: hsl(0, 0%, 25%);
		}
	}
`;

const Body = styled.div`
	position: relative;
	@media (min-width: 600px) {
		width: 85%;
		margin: auto;
	}
`;

const ChartWrapper = styled.div`
	padding: 75px 0px;
`;

const AddButton = styled( Button )`
	position: fixed;
	top: 87px;
	right: 10px;
	background: linear-gradient(rgba(244, 167, 192, 0.96), rgba(244, 144, 192, 0.96)) !important;
	color: #fff !important;
	font-size: 1.1em !important;
	i.icon {
		font-size: 1.2em;
	}
	@media (min-width: 600px) {
		right: 7.5%;
	}
`;

const Logout = styled( Button )`
	position: absolute;
	top: 16.5px;
	left: 10px;
	font-size: 1em;
	margin: 0px !important;
	background: #fff !important;
	color: #7ED495 !important;
	border: 1px solid #7ED495 !important;
`;


class HomePage extends React.Component {
	constructor() {
		super();
		this.state = {
			transactions: [],
			currentBalance: undefined
		};
		this.onWindowResize = this.onWindowResize.bind( this );
	}
	componentWillMount () {
		this.getInitialTransactions();
		this.getBalance();
		this.onWindowResize();
	}

	componentDidMount() {
		window.addEventListener("resize", this.onWindowResize );
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.onWindowResize );
	}

	onWindowResize() {
		var smallDevice = window.screen.width < 768 ? true : false;
		if ( smallDevice !== this.state.smallDevice ) {
			this.setState({ smallDevice: smallDevice });
		}
	}

	getAllTransactions = () => {
		axios({
			method: "get",
			url: "/api/balances/all-transactions",
			headers: { "Authorization": "Token " + localStorage.token }
		})
		.then( res => this.setState({ transactions: res.data }) )
		.catch( err => console.log( err ) );
	};

	getInitialTransactions = () => {
		// get the initial 10 transactions
		axios({
			method: "get",
			url: "/api/balances/",
			headers: { "Authorization": "Token " + localStorage.token }
		})
		.then( res => this.setState({ transactions: res.data }) )
		.catch( err => console.log( err ) );
	};

	getBalance = () => {
		// get the current balance
		axios({
			method: "get",
			url: "/api/balances/total",
			headers: { "Authorization": "Token " + localStorage.token }
		})
		.then( res => this.setState({ currentBalance: res.data.totalBalance }) )
		.catch( err => console.log( err ) );
	};

	createTransaction = (description, amount) => {
		axios({
			method: "post",
			url: "/api/balances/create-transaction",
			headers: { Authorization: "Token " + localStorage.token },
			data:  {
				"description": description,
				"amount": parseFloat( amount )
		}
	}).then( res => {
		this.updateData();
	}).catch( err => console.log( err ) );
	};

	updateData = () => {
		this.getInitialTransactions();
		this.getBalance();
	};

	render() {
		return (
			<MainWrapper fluid={true}>
				<Header>
					<CurrentBalance>
						Current Balance: <b>{this.state.currentBalance} €</b>
					</CurrentBalance>
				</Header>
				<Body>
					{ this.props.isAuthenticated &&
						<Logout onClick={this.props.logout}>Logout</Logout>
					}
					<ChartWrapper>
						<TransChart
							transactions={[ ...this.state.transactions ].reverse()}
							smallDevice={this.state.smallDevice}
						/>
					</ChartWrapper>

					<TableContainer>
						<TransTable
							updateData={this.updateData}
							smallDevice={this.state.smallDevice}
							showLess={this.getInitialTransactions}
							showingAll={this.state.transactions.length > 10 ? true : false}
							getAllTransactions={this.getAllTransactions}
							transactions={this.state.transactions} />
					</TableContainer>

				</Body>
				<CreateTransactionsForm
					addTrans={this.createTransaction}
					trigger={<AddButton circular icon="add" />}
				/>
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
