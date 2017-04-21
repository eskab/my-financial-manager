import React, { Component } from "react";
import PropTypes from "prop-types";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { TableHeader } from "../../components";
import { mapStringsToObjects } from "../../utils";
import { ExpenseTableRow } from "./ExpenseTableRow";
import "./ExpenseTable.scss";

@observer
class ExpenseTable extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };
  static TableHeaderFields = ["Date", "Category", "Name", "Amount", ""];

  static eventHasDatePickerClass(className) {
    return className.split("__").some(singleClassName => singleClassName === "react-datepicker");
  }

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
    // editMode to default when clicking on datepicker (in tether - arrows)
    if (this.editMode.isActive && !this.table.contains(target) && !ExpenseTable.eventHasDatePickerClass(target.className)) {
      this.disableEditMode();
    }
  }

  @action.bound
  enableEditMode(editMode) {
    this.editMode = editMode;
  }

  @action.bound
  disableEditMode() {
    this.editMode = { isActive: false, id: null, field: null };
  }

  render() {
    return (
      <table className="table expenses-table" ref={(table) => { this.table = table; }}>
        <TableHeader
          fields={mapStringsToObjects(ExpenseTable.TableHeaderFields, "value")}
          sort={this.props.store.sort}
        />
        <tbody>
          {this.props.store.expenses.map(expense =>
            <ExpenseTableRow
              expense={expense}
              enableEditMode={this.enableEditMode}
              disableEditMode={this.disableEditMode}
              editMode={this.editMode}
            />
          )}
        </tbody>
      </table>
    );
  }
}

export { ExpenseTable };
