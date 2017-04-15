import React, { Component } from "react";
import { observer } from "mobx-react";
import { ExpenseTable } from "./ExpenseTable";

@observer
class ExpenseTableContainer extends Component {
  render() {
    return (
      <div className="expenses-table-container">
        <h3>Tabela wydatków</h3>
        <ExpenseTable store={this.props.store} />
      </div>
    );
  }
}

export { ExpenseTableContainer };
