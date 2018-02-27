import React from "react";
import { Modal, Form } from "semantic-ui-react";
import styled from "styled-components";
import axios from "axios";

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

class UpdateTransactionsForm extends React.Component {
	constructor(props) {
		super( props );
		this.state = {
			description: props.description,
			amount: props.amount,
			pk: props.pk
		};
	}

	handleChange = (e) =>
		this.setState({ [ e.target.name ]: e.target.value });

	handleSubmit = () => {
		axios({
			method: "put",
			url: "api/balances/update-transaction",
			headers: { Authorization: "Token " + localStorage.token },
			data: {
				pk: this.state.pk,
				description: this.state.description,
				amount: parseFloat( this.state.amount )
			}
		})
		.then( res => console.log( res ) )
		.catch( err => console.log( err ) );
	};

	render() {
		return (
			<Modal trigger={this.props.trigger}>
				<FormHeader>Update the transaction</FormHeader>
				<Modal.Content>
					<Form onSubmit={this.handleSubmit}>
						<Form.Field>
							<StyledInput
								name="description"
								value={this.state.description}
								onChange={this.handleChange}
								placeholder="Description"
							/>
						</Form.Field>
						<Form.Field>
							<StyledInput
								type="number"
								name="amount"
								value={this.state.amount}
								onChange={this.handleChange}
								placeholder="Amount"
							/>
						</Form.Field>
						<SubmitButton>
							Update
						</SubmitButton>
					</Form>
				</Modal.Content>
			</Modal>
		);
	}
};

export default UpdateTransactionsForm;
