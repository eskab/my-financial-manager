import React from "react";

const ExpenseTableCol = (({ className, value, editFieldName, onInputKeyDown }) =>
  <td className={className}>
    {(editFieldName && editFieldName === className) ?
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
