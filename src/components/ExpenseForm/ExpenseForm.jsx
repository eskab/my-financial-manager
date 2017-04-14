import React, { Component } from "react";
import "./ExpenseForm.scss";

class ExpenseForm extends Component {
  name = "";
  category = "";
  amount = 0;

  handleCategoryChange = ({ target }) => {
    this.category = target.value;
  }

  handleAmountChange = ({ target }) => {
    this.amount = target.value;
  }

  handleNameChange = ({ target }) => {
    this.name = target.value;
  }

  handleButtonClick = () => {
    this.props.store.postNewExpense({
      name: this.name,
      amount: this.amount,
      category: this.category
    });
  }

  render() {
    return (
      <div className="form">
        <h3>Dodaj wydatek</h3>
        <div className="form-child">
          <label>Kategoria</label>
          <select onChange={this.handleCategoryChange}>
            <option>Nieplanowane</option>
            <option>Jedzenie</option>
            <option>Rachunki</option>
          </select>
        </div>
        <div className="form-child">
          <label>Nazwa</label>
          <input type="text" onChange={this.handleNameChange} />
        </div>
        <div className="form-child">
          <label>Kwota</label>
          <input type="number" onChange={this.handleAmountChange} />
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