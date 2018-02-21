import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Container } from "semantic-ui-react";
import styled from "styled-components";
import axios from "axios";

import TransChart from "../transChart";
import TransTable from "../transTable";

const MainWrapper = styled( Container )`
	font-family: 'Ubuntu', sans-serif !important;
	width: 90% !important;
`;

const CurrentBalance = styled.span`
	margin: 70px auto;
	font-size: 25px;
	display: block;
`;


class HomePage extends React.Component {
	constructor() {
		super();
		this.state = {
			transactions: [],
			currentBalance: undefined
		};
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
	}

	render() {
		return (
			<MainWrapper fluid={true}>
				{ this.props.isAuthenticated &&
					<span onClick={this.props.logout}>logout</span>
				}
				<TransChart transactions={this.state.transactions} />
				<CurrentBalance>
					Current Balance: <b>{this.state.currentBalance} €</b>
				</CurrentBalance>
				<Container>
					<TransTable transactions={this.state.transactions} />
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
