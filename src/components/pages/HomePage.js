import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Container, Button } from "semantic-ui-react";
import styled from "styled-components";
import axios from "axios";

import TransChart from "../transChart";
import TransTable from "../transTable";

const MainWrapper = styled.div`
	font-family: 'Ubuntu', sans-serif !important;
	width: 100%;
	margin: 0px auto;
	background: #f5f5f5;
	@media (max-width: 600px) {
		width: 100%;
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
`;

const Body = styled.div`
	position: relative;
`;

const ChartWrapper = styled.div`
	padding: 65px 0px;
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
`;

const Logout = styled( Button )`
	position: absolute;
	top: 14px;
	left: 10px;
	color: hsl(0,0%,30%) !important;
	font-size: 1em;
	margin: 0px !important;
	background: #EBECED !important;
`;


class HomePage extends React.Component {
	constructor() {
		super();
		this.state = {
			transactions: [],
			allTransactions: [],
			currentBalance: undefined
		};
		this.onWindowResize = this.onWindowResize.bind( this );
	}
	componentWillMount () {
		axios.get("/api/balances/", { "headers": { "Authorization": "Token " + localStorage.token }
	}).then( res => this.setState({ transactions: res.data }) )
		.catch( err => console.log( err ) );

		axios.get("/api/balances/total",  { "headers": {
			"Authorization": "Token " + localStorage.token
		} })
		.then( res => this.setState({ currentBalance: res.data.totalBalance }) )
		.catch( err => console.log( err ) );

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
		axios.get("/api/balances/all-transactions",
		{ "headers": { "Authorization": "Token " + localStorage.token } })
		.then( res => this.setState({ allTransactions: res.data }) )
		.catch( err => console.log( err ) );
	};

	showLess = () =>
	this.setState({ allTransactions: [] });

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
							smallDevice={this.state.smallDevice}
							showLess={this.showLess}
							showingAll={this.state.allTransactions.length > 0 ? true : false}
							getAllTransactions={this.getAllTransactions}
							transactions={this.state.allTransactions.length > 0 ?
								this.state.allTransactions
							:
								this.state.transactions
							} />
					</TableContainer>

				</Body>

				<AddButton circular icon="add" />


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
