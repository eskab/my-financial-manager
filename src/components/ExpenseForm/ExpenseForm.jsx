import React, { Component } from "react";
import axios from "axios";
import "./ExpenseForm.scss";

class ExpenseForm extends Component {
  category = "";
  amount = 0;

  onCategoryChange = ({ target }) => {
    this.category = target.value;
  }

  onAmountChange = ({ target }) => {
    this.amount = target.value;
  }

  onButtonClick = () => {
    axios.post("http://localhost:3000/expenses", {
      id: `${Math.random()}-${Math.random()}`,
      date: "2018-09-30",
      amount: this.amount,
      category: this.category,
    }).then(({ data }) => this.props.store.addNew(data));
  }

  render() {
    return (
      <div className="form">
        <h3>Dodaj wydatek</h3>
        <div className="form-child">
          <label>Kategoria</label>
          <select onChange={this.onCategoryChange}>
            <option>Nieplanowane</option>
            <option>Jedzenie</option>
            <option>Rachunki</option>
          </select>
        </div>
        <div className="form-child">
          <label>Kwota</label>
          <input type="number" onChange={this.onAmountChange} />
        </div>
        <button onClick={this.onButtonClick}>Zatwierdź</button>
      </div>
    );
  }
}

export { ExpenseForm };