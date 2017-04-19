import React, { Component } from "react";
import PropTypes from "prop-types";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { TableHeader } from "../../components";
import { ExpenseTableRow } from "./ExpenseTableRow";
import "./ExpenseTable.scss";

@observer
class ExpenseTable extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  @observable.struct editMode = { isActive: false, id: null, field: null };
  table;

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
    // I know this is weird, but this is solution for now to prevent setting
    // editMode to default when clicking on datepicker (in tether)
    if (this.editMode.isActive && !this.table.contains(target) && !target.className.split("__").some(className => className === "react-datepicker")) {
      this.setEditMode();
    }
  }

  @action.bound
  setEditMode(editMode = { isActive: false, id: null, field: null }) {
    this.editMode = editMode;
  }

  render() {
    return (
      <table className="table expenses-table" ref={(table) => { this.table = table; }}>
        <TableHeader
          fields={[
            {
              value: "Date",
            },
            {
              value: "Category",
            },
            {
              value: "Name",
            },
            {
              value: "Amount",
            },
          ]}
          sort={this.props.store.sort}
        />
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