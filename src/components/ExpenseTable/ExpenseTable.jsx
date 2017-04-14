import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { ExpenseTableRow } from "./";
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
              <td>Nazwa</td>
              <td>Koszt</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {this.props.store.expenses.map(expense =>
              <ExpenseTableRow
                expense={expense}
              />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export { ExpenseTable };