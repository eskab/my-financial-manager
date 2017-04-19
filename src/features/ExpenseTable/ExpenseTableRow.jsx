import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { CATEGORY_OPTIONS } from "../../constants";
import { ExpenseTableInputCol, ExpenseTableSelectCol, ExpenseTableDateCol } from "./ExpenseTableCol";

@observer
class ExpenseTableRow extends Component {
  static propTypes = {
    expense: PropTypes.object.isRequired,
    setEditMode: PropTypes.func.isRequired,
    editMode: PropTypes.object.isRequired
  };

  static EDITABLE_COLS = ["expense-date", "expense-category", "expense-name", "expense-amount"];
  static INPUT_SUBMIT_KEY_CODES = [13];
  static INPUT_UNDO_KEY_CODES = [27];

  get selectOptions() {
    return CATEGORY_OPTIONS.map(option => ({ name: option }));
  }

  handleRowClick = ({ target }) => {
    if (target.nodeName !== "INPUT" && ExpenseTableRow.EDITABLE_COLS.some(editableCol => editableCol === target.className)) {
      this.props.setEditMode({ id: target.parentNode.id, field: target.className, isActive: true });
    }
  }

  handleInputKeyDown = ({ keyCode, target }) => {
    const { expense, setEditMode } = this.props;

    if (ExpenseTableRow.INPUT_SUBMIT_KEY_CODES.some(code => code === keyCode)) {
      // will be refactored
      expense.updateField(target.className.replace("input-expense-", ""), target.value);
      setEditMode();
    } else if (ExpenseTableRow.INPUT_UNDO_KEY_CODES.some(code => code === keyCode)) {
      setEditMode();
    }
  }

  handleDeleteButtonClick = () => {
    this.props.expense.erase();
  }

  handleDatePickerClick = (date) => {
    const { expense, setEditMode } = this.props;

    expense.updateField("date", date);
    setEditMode();
  }

  handleSelectClick = (value) => {
    const { expense, setEditMode } = this.props;

    expense.updateField("category", (value || {}).name || null);
    setEditMode();
  }

  render() {
    const { id, date, amount, category, name } = this.props.expense;
    const { editMode } = this.props;

    return (
      <tr id={id} key={id} className="expense-row" onClick={this.handleRowClick}>
        <ExpenseTableDateCol
          className="expense-date"
          value={date}
          editMode={editMode.id === id && editMode.field === "expense-date"}
          onClickDatePicker={this.handleDatePickerClick}
        />
        <ExpenseTableSelectCol
          className="expense-category"
          value={category}
          editMode={editMode.id === id && editMode.field === "expense-category"}
          onClickSelect={this.handleSelectClick}
          options={this.selectOptions}
        />
        <ExpenseTableInputCol
          className="expense-name"
          value={name}
          editMode={editMode.id === id && editMode.field === "expense-name"}
          onInputKeyDown={this.handleInputKeyDown}
        />
        <ExpenseTableInputCol
          className="expense-amount"
          value={amount}
          editMode={editMode.id === id && editMode.field === "expense-amount"}
          onInputKeyDown={this.handleInputKeyDown}
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
