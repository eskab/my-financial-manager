import React from "react";
import PropTypes from "prop-types";

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

ExpenseTableCol.propTypes = {
  className: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  editMode: PropTypes.boolean,
  onInputKeyDown: PropTypes.function,
};

ExpenseTableCol.defaultProps = {
  editMode: false,
  onInputKeyDown: () => {}
};

export { ExpenseTableCol };
