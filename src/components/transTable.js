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

class TransTable extends React.Component {
	render() {
		return (
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
	}
}

export default TransTable;
