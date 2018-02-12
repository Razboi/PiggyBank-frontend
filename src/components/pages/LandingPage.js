import React from "react";
import styled from "styled-components";
import { Form } from "semantic-ui-react";

const LandingWrapper = styled.div`
	height: 100vh;
	display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled( Form )`
	height: 50%;
	width: 90%;
	border: 1px solid #000;
	display: flex;
	flex-direction: column;
	justify-content: center;
  align-items: center;
`;

const LoginInput = styled( Form.Input )`
	width: 90%;
	.ui.input input {
		text-align: center;
	}
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
				<LoginForm>
					<LoginInput placeholder="Username" />
					<LoginInput placeholder="Password" type="password" />
				</LoginForm>
			</LandingWrapper>
		);
	}
}

export default LandingPage;
