import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";


class HomePage extends React.Component {
	render() {
		console.log( localStorage.getItem("token") );
		return (
			<div>
				{ this.props.isAuthenticated &&
					<span onClick={this.props.logout}>logout</span>
				}
				<h1>Home</h1>
			</div>
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
