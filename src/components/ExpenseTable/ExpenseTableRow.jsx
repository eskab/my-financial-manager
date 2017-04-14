import React, { Component } from "react";
import { observer } from "mobx-react";
import { INPUT_SUBMIT_KEY_CODES, INPUT_UNDO_KEY_CODES } from "../../constants";
import { ExpenseTableCol } from "./ExpenseTableCol";

@observer
class ExpenseTableRow extends Component {
  constructor() {
    super();
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
  }

  handleRowClick({ target }) {
    if (target.nodeName !== "INPUT" && target.className.split(" ").some(className => className === "editable")) {
      this.props.expense.toggleEditMode(target.className);
    }
  }

  handleInputKeyDown({ keyCode, target }) {
    if (INPUT_SUBMIT_KEY_CODES.some(code => code === keyCode)) {
      // will be refactored
      this.props.expense.updateField(target.className.replace("input-editable expense-", ""), target.value);
    } else if (INPUT_UNDO_KEY_CODES.some(code => code === keyCode)) {
      this.props.expense.setEditModeToDefault();
    }
  }

  handleDeleteButtonClick() {
    this.props.expense.erase();
  }

  render() {
    const { id, date, amount, category, name, editMode } = this.props.expense;

    return (
      <tr id={id} key={id} className="expense-row" onClick={this.handleRowClick}>
        <ExpenseTableCol
          className="expense-date"
          value={date}
        />
        <ExpenseTableCol
          className="editable expense-category"
          value={category}
          editFieldName={editMode.fieldName}
          onInputKeyDown={this.handleInputKeyDown}
        />
        <ExpenseTableCol
          className="editable expense-name"
          value={name}
          editFieldName={editMode.fieldName}
          onInputKeyDown={this.handleInputKeyDown}
        />
        <ExpenseTableCol
          className="editable expense-amount"
          value={amount}
          editFieldName={editMode.fieldName}
          onInputKeyDown={this.handleInputKeyDown}
        />
        <td>
          <button onClick={this.handleDeleteButtonClick}>Usuń</button>
        </td>
      </tr>
    );
  }
}

export { ExpenseTableRow };
