import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";
import { ExpenseTableRow } from "./ExpenseTableRow";
import "./ExpenseTable.scss";

@observer
class ExpenseTable extends Component {
  @observable.struct editMode = { isActive: false, id: null, field: null };

  componentWillMount() {
    document.addEventListener("click", this.handleClickOutsideTable);
  }

  componentDidMount() {
    this.props.store.loadData();
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutsideTable);
  }

  handleClickOutsideTable = ({ target }) => {
    const table = ReactDOM.findDOMNode(this.refs.table);

    if (!table.contains(target)) {
      this.setEditMode();
    }
  }

  @action
  setEditMode = (editMode = { isActive: false, id: null, field: null }) => {
    this.editMode = editMode;
  }

  render() {
    return (
      <table className="table expenses-table" ref="table">
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
              setEditMode={this.setEditMode}
              editMode={this.editMode}
            />
          )}
        </tbody>
      </table>
    );
  }
}

export { ExpenseTable };