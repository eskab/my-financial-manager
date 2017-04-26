import React, { Component } from "react";
import PropTypes from "prop-types";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";
import { CATEGORY_OPTIONS, DATE_FORMAT_UI } from "../../constants";
import { mapStringsToObjects } from "../../utils";
import "./ExpenseForm.scss";

@observer
class ExpenseForm extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };

  @observable name = "";
  @observable category = CATEGORY_OPTIONS[0];
  @observable amount = 0;
  @observable date = moment();

  @action.bound
  handleCategoryChange(value) {
    this.category = (value || {}).name || null;
  }

  @action.bound
  handleAmountChange({ target }) {
    this.amount = target.value;
  }

  @action.bound
  handleNameChange({ target }) {
    this.name = target.value;
  }

  @action.bound
  handleDateChange(date) {
    this.date = date;
  }

  @action.bound
  handleButtonClick() {
    this.props.store.postExpense({
      name: this.name,
      amount: this.amount,
      category: this.category,
      date: this.date,
    }).then(this.restoreDefault);
  }

  @action.bound
  restoreDefault() {
    this.name = "";
    this.category = "";
    this.amount = 0;
    this.date = moment();
  }

  render() {
    return (
      <div className="form">
        <h3>Add expenditure</h3>
        <div className="form-container">
          <div className="form-child">
            <label htmlFor="expense-form-category">Category</label>
            <Select
              id="expense-form-category"
              labelKey="name"
              valueKey="name"
              value={this.category}
              options={mapStringsToObjects(CATEGORY_OPTIONS, "name")}
              onChange={this.handleCategoryChange}
            />
          </div>
          <div className="form-child">
            <label htmlFor="expense-form-date-picker">Date</label>
            <DatePicker
              id="expense-form-date-picker"
              selected={this.date}
              onChange={this.handleDateChange}
              placeholderText="Choose/enter date"
              dateFormat={DATE_FORMAT_UI}
            />
          </div>
          <div className="form-child">
            <label htmlFor="expense-form-name">Name</label>
            <input
              id="expense-form-name"
              type="text"
              value={this.name}
              onChange={this.handleNameChange}
              placeholder="Enter name"
            />
          </div>
          <div className="form-child">
            <label htmlFor="expense-form-amount">Amount</label>
            <input
              id="expense-form-amount"
              type="number"
              value={this.amount}
              onChange={this.handleAmountChange}
              placeholder="Enter amount"
            />
          </div>
          <button
            className="button"
            onClick={this.handleButtonClick}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export { ExpenseForm };
