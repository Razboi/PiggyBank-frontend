import React from "react";
import { Table, Button } from "semantic-ui-react";
import styled from "styled-components";

import UpdateTransactionsForm from "./forms/updateTransaction";

const TransactionsTable = styled( Table )`
	border: none !important;
	color: hsl(0, 0%, 25%) !important;
`;

const TransactionsButton = styled( Button )`
	background: linear-gradient(#8DEEA7, #7ED495) !important;
	display: block !important;
	margin: 0px auto !important;
	width: 200px;
	color: #fff !important;
`;

const TransHeader = styled( Table.Cell )`
	color: hsl(0, 0%, 18%) !important;
	display: block;
	text-align: center !important;
	font-size: 18px;
`;

const Data = styled.span`
	float: right;
	display: inline-block;
	color: hsl(0, 0%, 30%)
`;

const DataDate = styled( Data )`
	color: hsl(0, 0%, 25%) !important;
`;

const ChangeIcon = styled( Button )`
	font-size: 0.8rem !important;
	color: #F4A7C0 !important;
	background: none !important;
	border: 1px solid #F4A7C0 !important;
	margin-bottom: 8px !important;
	.icon {
		font-size: 1.2em !important;
	}
`;

class TransTable extends React.Component {
	render() {
		var responsiveTable = undefined;
		this.props.smallDevice ?
			responsiveTable = (
				<TransactionsTable celled>
					<Table.Header>
						<Table.Row>
							<TransHeader>Transactions</TransHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{this.props.transactions.map( (transaction, index) =>
							<Table.Row key={index}>
								<Table.Cell>
									<UpdateTransactionsForm
										trigger={<ChangeIcon circular icon="pencil" />}
										amount={transaction.amount}
										description={transaction.description}
										pk={transaction.pk}
									/>
								</Table.Cell>
								<Table.Cell>
									<b>Date:</b>
									<DataDate>{transaction.date.split("T")[ 0 ]}</DataDate>
								</Table.Cell>
								<Table.Cell>
									<b>Description:</b>
									<Data>{transaction.description}</Data>
								</Table.Cell>
								<Table.Cell>
									<b>Amount:</b>
									<Data>{transaction.amount}</Data>
								</Table.Cell>
								<Table.Cell>
									<b>Balance:</b>
									<Data>{transaction.currentTotal}</Data>
								</Table.Cell>
							</Table.Row>
						)}
					</Table.Body>
					<Table.Footer>
						<Table.Row>
							<Table.HeaderCell colSpan="4">
								{this.props.showingAll ?
									<TransactionsButton onClick={this.props.showLess}>
										See less
									</TransactionsButton>
								:
								<TransactionsButton onClick={this.props.getAllTransactions}>
									See all
								</TransactionsButton>
								}
							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				</TransactionsTable>
			)
			:
			responsiveTable = (
				<TransactionsTable celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Date</Table.HeaderCell>
							<Table.HeaderCell>Description</Table.HeaderCell>
							<Table.HeaderCell>Amount</Table.HeaderCell>
							<Table.HeaderCell>Balance</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{this.props.transactions.map( (transaction, index) =>
							<Table.Row key={index}>
								<Table.Cell>{transaction.date.split("T")[ 0 ]}</Table.Cell>
								<Table.Cell>{transaction.description}</Table.Cell>
								<Table.Cell>{transaction.amount}</Table.Cell>
								<Table.Cell>{transaction.currentTotal}</Table.Cell>
								<Table.Cell>
									<ChangeIcon circular icon="pencil" />
								</Table.Cell>
							</Table.Row>
						)}
					</Table.Body>
					<Table.Footer>
						<Table.Row>
							<Table.HeaderCell colSpan="4">
								{this.props.showingAll ?
									<TransactionsButton onClick={this.props.showLess}>
										See less
									</TransactionsButton>
								:
								<TransactionsButton onClick={this.props.getAllTransactions}>
									See all
								</TransactionsButton>
								}
							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				</TransactionsTable>
			);
		return (
			responsiveTable
		);
	}
}

export default TransTable;
