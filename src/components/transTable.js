import React from "react";
import { Table, Button } from "semantic-ui-react";
import styled from "styled-components";

const TransactionsTable = styled( Table )`
	margin-top: 80px !important;
`;

const TransactionsButton = styled( Button )`
	display: block !important;
	margin: 0px auto !important;
	width: 200px;
`;

const TransHeader = styled( Table.Cell )`
	display: block;
	text-align: center !important;
	font-weight: bold;
	font-size: 18px;
`;

const Data = styled.span`
	float: right;
	display: inline-block;
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
									<b>Date:</b>
									<Data>{transaction.date.split("T")[ 0 ]}</Data>
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
								<TransactionsButton primary>See all</TransactionsButton>
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
							</Table.Row>
						)}
					</Table.Body>
					<Table.Footer>
						<Table.Row>
							<Table.HeaderCell colSpan="4">
								<TransactionsButton primary>See all</TransactionsButton>
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
