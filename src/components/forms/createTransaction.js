import React from "react";
import { Modal, Form } from "semantic-ui-react";
import styled from "styled-components";

const SubmitButton = styled( Form.Button )`
	.ui.button {
		background: linear-gradient(
			rgba(244, 167, 192, 0.96), rgba(244, 144, 192, 0.96)
			) !important;
		color: #fff !important;
		display: block !important;
		margin: auto !important;
	}
`;

const StyledInput = styled.input`
	text-align: center !important;
	:focus {
		border-color: #7ED495 !important;
	}
`;

const FormHeader = styled( Modal.Header )`
	text-align: center;
`;

class CreateTransactionsForm extends React.Component {
	constructor() {
		super();
		this.state = {
			description: "",
			amount: 0
		};
	}

	handleChange = (e) =>
		this.setState({ [ e.target.name ]: e.target.value });

	handleSubmit = () => {
		this.props.addTrans( this.state.description, this.state.amount );
	};

	render() {
		return (
			<Modal trigger={this.props.trigger} size="mini">
				<FormHeader>Add a new transaction</FormHeader>
				<Modal.Content>
					<Form onSubmit={this.handleSubmit}>
						<Form.Field>
							<StyledInput
								name="description"
								onChange={this.handleChange}
								placeholder="Description"
							/>
						</Form.Field>
						<Form.Field>
							<StyledInput
								type="number"
								name="amount"
								onChange={this.handleChange}
								placeholder="Amount"
							/>
						</Form.Field>
						<SubmitButton>
							Add
						</SubmitButton>
					</Form>
				</Modal.Content>
			</Modal>
		);
	}
};

export default CreateTransactionsForm;
