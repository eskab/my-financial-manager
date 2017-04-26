import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { CATEGORY_OPTIONS } from "../../constants";
import { mapStringsToObjects } from "../../utils";
import { ExpenseTableInputCol, ExpenseTableSelectCol, ExpenseTableDateCol } from "./ExpenseTableCol";

@observer
class ExpenseTableRow extends Component {
  static propTypes = {
    expense: PropTypes.object.isRequired,
    editMode: PropTypes.object.isRequired,
    enableEditMode: PropTypes.func.isRequired,
    disableEditMode: PropTypes.func.isRequired,
  };
  static EDITABLE_COLS = ["date", "category", "name", "amount"];
  static INPUT_SUBMIT_KEY_CODES = [13];
  static INPUT_UNDO_KEY_CODES = [27];

  static isColEditable(colName) {
    return ExpenseTableRow.EDITABLE_COLS.some(editableCol => editableCol === colName);
  }

  static eventHasSubmitKeyCode(keyCode) {
    return ExpenseTableRow.INPUT_SUBMIT_KEY_CODES.some(code => code === keyCode);
  }

  static eventHasUndoKeyCode(keyCode) {
    return ExpenseTableRow.INPUT_UNDO_KEY_CODES.some(code => code === keyCode);
  }

  constructor() {
    super();

    /* eslint-disable no-param-reassign */
    this.handleRowClickActions = ExpenseTableRow.EDITABLE_COLS.reduce((handleActionsObject, current) => {
      handleActionsObject[current] = this.handleRowClick.bind(this, current);
      return handleActionsObject;
    }, {});
  }

  handleRowClick = (colName) => {
    if (!this.isColInEditMode(colName) && ExpenseTableRow.isColEditable(colName)) {
      this.props.enableEditMode({ id: this.props.expense.id, field: colName, isActive: true });
    }
  }

  handleInputKeyDown = ({ keyCode, target }, updateField) => {
    if (ExpenseTableRow.eventHasSubmitKeyCode(keyCode)) {
      updateField(target.value);
      this.props.disableEditMode();
    } else if (ExpenseTableRow.eventHasUndoKeyCode(keyCode)) {
      this.props.disableEditMode();
    }
  }

  handleDatePickerClick = (date) => {
    this.props.expense.updateDate(date);
    this.props.disableEditMode();
  }

  handleSelectClick = (category) => {
    this.props.expense.updateCategory((category || {}).name || null);
    this.props.disableEditMode();
  }

  handleDeleteButtonClick = () => {
    this.props.expense.destroy();
  }

  isColInEditMode(colName) {
    const { editMode } = this.props;
    return editMode.field === colName && editMode.id === this.tableRow.id;
  }

  render() {
    const { id, date, amount, category, name } = this.props.expense;

    return (
      <tr
        key={id}
        id={id}
        className="expense-row"
        ref={(ref) => { this.tableRow = ref; }}
      >
        <ExpenseTableDateCol
          className="expense-date"
          value={date}
          editMode={this.isColInEditMode("date")}
          onClickDatePicker={this.handleDatePickerClick}
          onClick={this.handleRowClickActions.date}
        />
        <ExpenseTableSelectCol
          className="expense-category"
          value={category}
          editMode={this.isColInEditMode("category")}
          onClickSelect={this.handleSelectClick}
          options={mapStringsToObjects(CATEGORY_OPTIONS, "name")}
          onClick={this.handleRowClickActions.category}
        />
        <ExpenseTableInputCol
          className="expense-name"
          value={name}
          editMode={this.isColInEditMode("name")}
          onInputKeyDown={event => this.handleInputKeyDown(event, this.props.expense.updateName)}
          onClick={this.handleRowClickActions.name}
        />
        <ExpenseTableInputCol
          className="expense-amount"
          value={amount}
          editMode={this.isColInEditMode("amount")}
          onInputKeyDown={event => this.handleInputKeyDown(event, this.props.expense.updateAmount)}
          onClick={this.handleRowClickActions.amount}
        />
        <td>
          <button
            className="button"
            onClick={this.handleDeleteButtonClick}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export { ExpenseTableRow };
