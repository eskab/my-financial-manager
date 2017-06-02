import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { DATE_FORMAT_UI } from "../../constants";

const ExpendituresTableInputCol = ({ className, value, editMode, onInputKeyDown, onClick }) =>
  <td className={className} onClick={onClick}>
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

ExpendituresTableInputCol.propTypes = {
  className: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  onInputKeyDown: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

const ExpendituresTableSelectCol = ({ className, value, editMode, onClickSelect, options, onClick }) =>
  <td className={className} onClick={onClick}>
    {editMode ?
      <Select
        labelKey="name"
        valueKey="name"
        value={value}
        options={options}
        onChange={onClickSelect}
      /> :
      value
    }
  </td>;

ExpendituresTableSelectCol.propTypes = {
  className: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  onClickSelect: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

const ExpendituresTableDateCol = ({ className, value, editMode, onClickDatePicker, onClick }) =>
  <td className={className} onClick={onClick}>
    {editMode ?
      <DatePicker
        className={className}
        selected={value}
        onChange={onClickDatePicker}
        autoFocus
      /> :
      value.format(DATE_FORMAT_UI)
    }
  </td>;

ExpendituresTableDateCol.propTypes = {
  className: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  onClickDatePicker: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export { ExpendituresTableInputCol, ExpendituresTableSelectCol, ExpendituresTableDateCol };
