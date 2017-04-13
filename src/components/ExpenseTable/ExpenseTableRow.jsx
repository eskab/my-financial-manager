import React, { Component } from "react";
import { observer } from "mobx-react";

const classNames = require("classnames");

@observer
class ExpenseTableRow extends Component {
  constructor() {
    super();
    this.handleEditRow = this.handleEditRow.bind(this);
  }

  handleEditRow({ target }) {
    if (target.nodeName !== "INPUT") {
      this.props.expense.toggleEditMode(target.className);
    }
  }

  render() {
    const { id, date, amount, category, name, editMode } = this.props.expense;

    return (
      <tr id={id} key={id} onClick={this.handleEditRow}>
        <td className="expense-date">{date}</td>
        <td className={classNames(
          "expense-category",
          { editableCol: editMode.fieldName === "expense-category" }
        )}>
          {editMode.fieldName === "expense-category" ?
            <input type="text" defaultValue={category} /> :
            category
          }
        </td>
        <td className={classNames(
          "expense-name",
          { editableCol: editMode.fieldName === "expense-name" }
        )}>
          {name}
        </td>
        <td className={classNames(
          "expense-amount",
          { editableCol: editMode.fieldName === "expense-amount" }
        )}>
          {amount}
        </td>
      </tr>
    );
  }
}

export { ExpenseTableRow };
