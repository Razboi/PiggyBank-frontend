import React from "react";
import styled from "styled-components";
import { Form, Image, Icon } from "semantic-ui-react";
import background from "../../images/back3.jpeg";

const LandingWrapper = styled.div`
	height: 100vh;
	display: flex;
  justify-content: center;
  align-items: center;
	background-image: url(${background});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: left;
`;

const LoginForm = styled( Form )`
	z-index: 3;
	align-self: flex-end;
	height: auto;
	width: 80%;
	display: flex;
	flex-direction: column;
	justify-content: center;
  align-items: center;
`;

const LoginInput = styled( Form.Input )`
	width: 80%;
	margin: 37px auto 0 auto !important;
	.ui.input input {
		text-align: center;
		border-width: 0px 0px 1px 0px !important;
		border-color: #fff !important;
		color: #fff !important;
	};
	input {
    background: none !important;
		border-radius: 0px !important;
	};
`;

const LoginButton = styled( Form.Button )`
	width: 80% !important;
	margin: 36px 0 !important;
	.ui.button {
		width: 100% !important;
		margin: 0px !important;
		border-radius: 15px !important;
		background: #F490C0;
		color: #fff;
		border-bottom: 1.66px solid #b2698c;
	};
	:active .ui.button {
		background: #b2698c;
	};
	.ui.button:focus {
		background: #b2698c;
	}
`;

const CreateAccount = styled.span`
	margin-bottom: 2em;
	color: #fff;
	font-size: 0.95rem;
`;

const Logo = styled( Image )`
	z-index: 3;
	position: absolute !important;
	top: 75px;
	width: 85px;
	height: auto;
`;

const BackgroundOverlay = styled.div`
	z-index: 2;
	background-color: rgba(0, 0, 0, 0.7);
	width: 100%;
	height: 100%;
	position: absolute !important;
`;

const FieldIcon = styled( Icon )`
	position: absolute;
	left: 40px;
	bottom: 13.25px;
	color: #fff;
`;

const InputWrapper = styled.div`
	position: relative;
	width: 100%;
`;

class LandingPage extends React.Component {
	constructor() {
		super();
		this.state = {

		};
	}
	render() {
		return (
			<LandingWrapper>
				<BackgroundOverlay />
				<Logo src={require("../../images/piggy.png")} />
				<LoginForm>
					<InputWrapper>
						<LoginInput placeholder="Username" />
						<FieldIcon name="user outline"/>
					</InputWrapper>
					<InputWrapper>
						<LoginInput placeholder="Password" type="password" />
						<FieldIcon name="lock" />
					</InputWrapper>
					<LoginButton>Login</LoginButton>
					<CreateAccount>Don't have an account? <b>Sign up</b></CreateAccount>
					</LoginForm>
			</LandingWrapper>
		);
	}
}

export default LandingPage;
