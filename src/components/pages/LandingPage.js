import React from "react";
import styled from "styled-components";
import { Form, Image, Icon } from "semantic-ui-react";
import background from "../../images/back3.jpeg";

const LandingWrapper = styled.div`
	height: 100vh;
	display: flex;
  justify-content: center;
  align-items: center;
`;

const BackgroundImage = styled.div`
	width: 100%;
	height: 100%;
	position: absolute !important;
	z-index: 1;
	background-image: url(${background});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: left;
	@media (min-width: 1000px) {
		width: 66.666%;
		right: 0px;
	}
`;

const BackgroundOverlay = styled.div`
	z-index: 2;
	background-color: rgba(0, 0, 0, 0.7);
	width: 100%;
	height: 100%;
	position: absolute !important;
	@media (min-width: 1000px) {
		width: 66.666%;
		right: 0px;
	}
`;

const FormWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	position: absolute;
	@media (min-width: 1000px) {
		width: 33.333%;
		left: 0px;
		background-color: #fafafb;
	}
`;

const LoginForm = styled( Form )`
	z-index: 3;
	align-self: center;
	height: auto;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
  align-items: center;
	@media (max-height: 800px) {
		position: absolute !important;
		bottom: 20%;
	}
`;

const TextWrapper = styled.div`
	visibility: hidden;
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
  align-items: center;
	border: none !important;
	@media (min-width: 1000px) {
		visibility: visible;
		height: 100%;
		width: 66.666%;
		right: 0px;
	}
`;

const MainText = styled.span`
	color: #fff;
	z-index: 3;
	font-size: 35px;
`;

const SecondaryText = styled.span`
	color: #fff;
	z-index: 3;
	font-size: 17px;
	margin-top: 35px;
`;

const LoginInput = styled( Form.Input )`
	width: 80%;
	margin: 37px auto 0 auto !important;
	.ui.input input {
		text-align: center;
		border-width: 0px 0px 1px 0px !important;
		border-color: #fff !important;
		color: #fff !important;
		@media (min-width: 1000px) {
			border-color: #000 !important;
			color: #000 !important;
		}
	};
	input {
    background: none !important;
		border-radius: 0px !important;
	};
`;

const LoginButton = styled( Form.Button )`
	width: 80% !important;
	max-width: 272px !important;
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
	@media (min-width: 1000px) {
		color: #000;
	}
`;

const Logo = styled( Image )`
	position: absolute !important;
	top: 75px;
	z-index: 3;
	width: 85px;
	height: auto;
	@media (min-height: 1000px) {
		top: 15%;
	}
`;

const FieldIcon = styled( Icon )`
	position: absolute;
	left: 40px;
	bottom: 13.25px;
	color: #fff;
	@media (min-width: 1000px) {
		color: #000;
	}
`;

const InputWrapper = styled.div`
	position: relative;
	width: 100%;
	max-width: 272px !important;
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
					<BackgroundImage />
					<BackgroundOverlay />
					<FormWrapper>
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
					</FormWrapper>
					<TextWrapper>
						<MainText>Welcome to <b>PiggyBank</b></MainText>
						<SecondaryText>Login to start managing your finances</SecondaryText>
					</TextWrapper>
				</LandingWrapper>

		);
	}
}

export default LandingPage;
