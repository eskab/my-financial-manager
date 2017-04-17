import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "./ExpenseForm.scss";
import "react-datepicker/src/stylesheets/datepicker.scss";

@observer
class ExpenseForm extends Component {
  static AVAILABLE_OPTIONS = ["Nieplanowane", "Jedzenie", "Rachunki"];

  @observable name = "";
  @observable category = ExpenseForm.AVAILABLE_OPTIONS[0];
  @observable amount = 0;
  @observable date = moment();

  @action.bound
  handleCategoryChange({ target }) {
    this.category = target.value;
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
    this.props.store.postNewExpense({
      name: this.name,
      amount: this.amount,
      category: this.category,
      date: this.date
    }).then(this.eraseData);
  }

  @action.bound
  eraseData() {
    this.name = "";
    this.category = "";
    this.amount = 0;
    this.date = moment();
  }

  render() {
    return (
      <div className="form">
        <h3>Dodaj wydatek</h3>
        <div className="form-child">
          <label>Kategoria</label>
          <select onChange={this.handleCategoryChange} value={this.category}>
            {ExpenseForm.AVAILABLE_OPTIONS.map(value =>
              <option key={`option_${value}`}>{value}</option>
            )}
          </select>
        </div>
        <div className="form-child">
          <label>Data</label>
          <DatePicker
            selected={this.date}
            onChange={this.handleDateChange}
            placeholderText="Choose/enter date"
          />
        </div>
        <div className="form-child">
          <label>Nazwa</label>
          <input type="text" value={this.name} onChange={this.handleNameChange} placeholder="Enter name" />
        </div>
        <div className="form-child">
          <label>Kwota</label>
          <input type="number" value={this.amount} onChange={this.handleAmountChange} placeholder="Enter amount" />
        </div>
        <button
          onClick={this.handleButtonClick}
        >
          Zatwierdź
        </button>
      </div>
    );
  }
}

export { ExpenseForm };