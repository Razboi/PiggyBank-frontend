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
	margin: 0px !important;
	@media (max-width: 600px) {
		padding: 100px 0px;
	}
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

	render() {
		return (
			<MainWrapper fluid={true}>
				{/* { this.props.isAuthenticated &&
					<span onClick={this.props.logout}>logout</span>
				} */}
				<TransChart
					transactions={this.state.transactions}
					height={this.state.chartHeight}
				/>
				<CurrentBalance>
					Current Balance: <b>{this.state.currentBalance} €</b>
				</CurrentBalance>
				<Container>
					<TransTable
						smallDevice={this.state.smallDevice}
						transactions={this.state.transactions} />
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
