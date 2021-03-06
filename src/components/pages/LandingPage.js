import React from "react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from  "prop-types";
import styled from "styled-components";
import { Form, Image, Icon, Message } from "semantic-ui-react";
import background from "../../images/back3.jpeg";

const LandingWrapper = styled.div`
	font-family: 'Ubuntu', sans-serif !important;
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
		width: 100%;
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
		width: 100%;
		right: 0px;
		background-color: rgba(0, 0, 0, 0.55);
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
		width: 430px;
		background-color: #fff;
		left: 5% !important;
		z-index: 3;
		height: 642px;
		box-shadow: 6px 6px 38px -9px rgba(38,43,48,1);
	};
	@media (min-width: 1000px) and (max-width: 1350px) {
		width: 330px !important;
	};
	@media (min-width: 1500px) {
		left: 10% !important;
	};
`;

const LoginForm = styled( Form )`
	z-index: 3;
	position: absolute !important;
	bottom: 10%;
	height: auto;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
  align-items: center;
	@media (max-height: 800px) and (min-height: 631px) {
		position: absolute !important;
		bottom: 20%;
	}
	@media (max-height: 630px) {
		height: 100%;
		align-self: center;
		bottom: 0px;
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
		width: 70%;
		right: 0px;
	}
`;

const MainText = styled.span`
	color: #fff;
	z-index: 3;
	font-size: 38px;
`;

const SecondaryText = styled.span`
	color: #fff;
	z-index: 3;
	font-size: 19px;
	margin-top: 2em;
	font-style: italic;
`;

const InputWrapper = styled.div`
	position: relative;
	width: 100%;
	max-width: 272px !important;
	border-bottom: 1px solid !important;
	border-color: #fff !important;
	@media (min-width: 1000px) {
		border-color: #262B30 !important;
	}
`;

const LoginInput = styled( Form.Input )`
	width: 80%;
	margin: 36px auto 0 auto !important;
	@media (min-height: 900px) {
		margin: 54px auto 0 auto !important;
	}
	.ui.input input {
		text-align: center;
		border: none !important;
		color: #fff !important;
		@media (min-width: 1000px) {
			color: #262B30 !important;
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
	@media (min-height: 900px) {
		margin: 54px 0 !important;
	}
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
	:hover .ui.button {
		background: #f4a3ca;
		color: #fff;
	}
	.ui.button:focus {
		background: #b2698c;
		color: #262B30 !important;
	}
`;

const CreateAccount = styled.span`
	font-style: italic;
	margin-top: 2em;
	margin-bottom: 2em;
	color: #fff;
	font-size: 1.1rem;
	@media (min-width: 1000px) {
		color: #808080;
	}
`;

const Logo = styled( Image )`
	position: absolute !important;
	top: 75px;
	z-index: 3;
	width: 85px;
	height: auto;
	@media (max-height: 630px) {
		visibility: hidden;
	}
	@media (min-height: 1000px) {
		top: 15%;
	}
	@media (min-width: 1000px) {
		top: 30px;
		left: 30px;
		width: 65px;
	}
`;

const FieldIcon = styled( Icon )`
	position: absolute;
	left: 22.5px;
	bottom: 13.25px;
	color: #fff;
	@media (min-width: 1000px) {
		color: #262B30;
	}
`;

const FormHeader = styled.span`
	visibility: hidden;
	position: absolute;
	top: 15%;
	font-size: 27px;
	font-weight: bold;
	color: #262B30;
	@media (min-width: 1000px) and (min-height: 575px) {
		visibility: visible;
	}
`;

const PinkText = styled.b`
	color: #F490C0;
`;

const LogoText = styled.span`
	visibility: hidden;
	position: absolute;
	top: 75px;
	left: 100px;
	color: #FFA733;
	font-weight: bold;
	z-index: 3;
	@media (min-width: 1000px) and (min-height: 575px) {
		visibility: visible;
	}
`;

const ErrorMessage = styled( Message )`
	background: none !important;
	position: absolute;
	box-shadow: none !important;
	top: 60px;
	margin: 50px 0px;
	@media (max-height: 500px) {
		top: 0px;
	}
`;


class LandingPage extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: "",
			dataErrors: false
		};
	}

validateData = () => {
	if ( this.state.username === "" || this.state.password === "") {
		this.setState({ dataErrors: true });
		return true;
	}
};

// check and submit data to the backend
	onSubmit = (e) => {
		const errors = this.validateData();
		if ( !errors ) {
			this.props.login({ username: this.state.username, password: this.state.password })
			.then( () =>
				this.props.history.push("/home")
			).catch( err =>
				this.setState({ dataErrors: true })
			);
		}
	};

// set the state with the input name = to the input value
	onChange = (e) => {
		this.setState({ [ e.target.name ]: e.target.value });
	};

	render() {
		return (
				<LandingWrapper>
					<BackgroundImage />
					<BackgroundOverlay />
					<Logo src={require("../../images/piggy.png")} />
					<LogoText>Start saving</LogoText>
					<FormWrapper onSubmit={this.onSubmit}>
						<FormHeader>Sign In</FormHeader>
						<LoginForm error={this.state.dataErrors}>
							<ErrorMessage
								error
								header="Invalid credentials"
								content="Incorrect username or password"
							/>
							<InputWrapper>
								<LoginInput
									placeholder="Username"
									name="username"
									onChange={this.onChange}
								/>
								<FieldIcon name="user outline"/>
							</InputWrapper>
							<InputWrapper>
								<LoginInput
									placeholder="Password"
									name="password"
									type="password"
									onChange={this.onChange}
								/>
								<FieldIcon name="lock" />
							</InputWrapper>
							<LoginButton>Sign In</LoginButton>
							<CreateAccount>
								Don't have an account? <b>Sign up</b>
							</CreateAccount>
						</LoginForm>
					</FormWrapper>
					<TextWrapper>
						<MainText>Welcome to <PinkText>PiggyBank</PinkText></MainText>
						<SecondaryText>Login to start managing your finances</SecondaryText>
					</TextWrapper>
				</LandingWrapper>

		);
	}
}

LandingPage.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	login: PropTypes.func.isRequired
};

export default connect( null, { login })( LandingPage );
