import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { CATEGORY_OPTIONS } from "../../constants";
import { mapStringsToObjects } from "../../utils";
import {
  ExpendituresTableInputCol,
  ExpendituresTableSelectCol,
  ExpendituresTableDateCol
} from "./ExpendituresTableCol";

@inject("expenditureTableStore")
@observer
class ExpendituresTableRow extends Component {
  static propTypes = {
    expense: PropTypes.object.isRequired,
    expenditureTableStore: PropTypes.object.isRequired
  };
  static EDITABLE_COLS = ["date", "category", "name", "amount"];
  static INPUT_SUBMIT_KEY_CODES = [13];
  static INPUT_UNDO_KEY_CODES = [27];

  static isColEditable(colName) {
    return ExpendituresTableRow.EDITABLE_COLS.some(editableCol => editableCol === colName);
  }

  static eventHasSubmitKeyCode(keyCode) {
    return ExpendituresTableRow.INPUT_SUBMIT_KEY_CODES.some(code => code === keyCode);
  }

  static eventHasUndoKeyCode(keyCode) {
    return ExpendituresTableRow.INPUT_UNDO_KEY_CODES.some(code => code === keyCode);
  }

  constructor() {
    super();

    /* eslint-disable no-param-reassign */
    this.handleRowClickActions = ExpendituresTableRow.EDITABLE_COLS.reduce((handleActionsObject, current) => {
      handleActionsObject[current] = this.handleRowClick.bind(this, current);
      return handleActionsObject;
    }, {});
  }

  handleRowClick = (colName) => {
    if (!this.isColInEditMode(colName) && ExpendituresTableRow.isColEditable(colName)) {
      this.props.expenditureTableStore.enableEditMode({ id: this.props.expense.id, fieldName: colName });
    }
  }

  handleInputKeyDown = ({ keyCode, target }, updateField) => {
    if (ExpendituresTableRow.eventHasSubmitKeyCode(keyCode)) {
      updateField(target.value);
      this.props.expenditureTableStore.disableEditMode();
    } else if (ExpendituresTableRow.eventHasUndoKeyCode(keyCode)) {
      this.props.expenditureTableStore.disableEditMode();
    }
  }

  handleDatePickerClick = (date) => {
    this.props.expense.updateDate(date);
    this.props.expenditureTableStore.disableEditMode();
  }

  handleSelectClick = (category) => {
    this.props.expense.updateCategory((category || {}).name || null);
    this.props.expenditureTableStore.disableEditMode();
  }

  handleDeleteButtonClick = () => {
    this.props.expense.destroy();
  }

  isColInEditMode(colName) {
    const { expenditureTableStore } = this.props;
    return expenditureTableStore.editedFieldName === colName && expenditureTableStore.editedColId === this.tableRow.id;
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
        <ExpendituresTableDateCol
          className="expense-date"
          value={date}
          editMode={this.isColInEditMode("date")}
          onClickDatePicker={this.handleDatePickerClick}
          onClick={this.handleRowClickActions.date}
        />
        <ExpendituresTableSelectCol
          className="expense-category"
          value={category}
          editMode={this.isColInEditMode("category")}
          onClickSelect={this.handleSelectClick}
          options={mapStringsToObjects(CATEGORY_OPTIONS, "name")}
          onClick={this.handleRowClickActions.category}
        />
        <ExpendituresTableInputCol
          className="expense-name"
          value={name}
          editMode={this.isColInEditMode("name")}
          onInputKeyDown={event => this.handleInputKeyDown(event, this.props.expense.updateName)}
          onClick={this.handleRowClickActions.name}
        />
        <ExpendituresTableInputCol
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

export { ExpendituresTableRow };
