import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/src/stylesheets/datepicker.scss";

const ExpenseTableCol = ({ className, value, editMode, onInputKeyDown }) =>
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
  </td>;

ExpenseTableCol.propTypes = {
  className: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  onInputKeyDown: PropTypes.func.isRequired,
};

const ExpenseTableDateCol = ({ className, value, editMode, onClickDatePicker }) =>
  <td className={className}>
    {editMode ?
      <DatePicker
        className={className}
        selected={value}
        onChange={onClickDatePicker}
        autoFocus
      /> :
      value.format("YYYY-MM-DD")
    }
  </td>;

ExpenseTableDateCol.propTypes = {
  className: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  onClickDatePicker: PropTypes.func.isRequired,
};

export { ExpenseTableCol, ExpenseTableDateCol };
