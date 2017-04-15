import React from "react";

const ExpenseTableCol = (({ className, value, editMode, onInputKeyDown }) =>
  <td className={className}>
    {editMode ?
      <input
        type="text"
        className={`input-${className}`}
        defaultValue={value}
        onKeyDown={onInputKeyDown}
        autoFocus
      /> :
      value
    }
  </td>
);

export { ExpenseTableCol };
