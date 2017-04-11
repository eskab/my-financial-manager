import React, { Component } from "react";
import { observer } from "mobx-react";
import "./ExpenseTable.scss";

@observer
class ExpenseTable extends Component {
  componentDidMount() {
    this.props.store.loadData();
  }

  render() {
    return (
      <div>
        <h3>Tabela wydatków</h3>
        <table className="table">
          <thead>
            <tr>
              <td>Data</td>
              <td>Kategoria</td>
              <td>Koszt</td>
            </tr>
          </thead>
          <tbody>
            {this.props.store.expenses.map(({ id, date, amount, category }) =>
              <tr key={id}>
                <td>{date}</td>
                <td>{category}</td>
                <td>{amount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export { ExpenseTable };