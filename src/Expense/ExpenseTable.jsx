import React, { Component } from "react";
import { observer } from "mobx-react";
import "./ExpenseTable.scss";

@observer
class ExpenseTable extends Component {
  componentDidMount() {
    this.props.store.loadData();
  }

  render() {
    const { store } = this.props;

    return (
      <table className="common-table">
        <thead>
          <tr>
            <td>Data</td>
            <td>Koszt</td>
          </tr>
        </thead>
        <tbody>
          {store.expenses.map(({ id, date, amount }) =>
            <tr key={id}>
              <td>{date}</td>
              <td>{amount}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export { ExpenseTable };