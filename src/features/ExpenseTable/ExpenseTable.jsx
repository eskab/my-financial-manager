import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { TableHeader } from "../../components";
import { mapStringsToObjects } from "../../utils";
import { ExpenseTableRow } from "./ExpenseTableRow";
import "./ExpenseTable.scss";

@inject("expenditureTableStore")
@observer
class ExpenseTable extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    expenditureTableStore: PropTypes.object.isRequired
  };
  static TableHeaderFields = ["Date", "Category", "Name", "Amount", ""];

  constructor(props) {
    super();

    this.table = null;
    this.expenditureTableStore = props.expenditureTableStore;
  }

  componentWillMount() {
    document.addEventListener("click", this.handleClickOutsideTable);
  }

  componentDidMount() {
    // todo
    // move it when implement router
    this.props.store.fetchData();
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutsideTable);
  }

  handleClickOutsideTable = ({ target }) => {
    if (this.expenditureTableStore.isInEditMode &&
      !this.table.contains(target) &&
      this.expenditureTableStore.editedFieldName !== "date") {
      this.expenditureTableStore.disableEditMode();
    }
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
            />
          )}
        </tbody>
      </table>
    );
  }
}

export { ExpenseTable };
