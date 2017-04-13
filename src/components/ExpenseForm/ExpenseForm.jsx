import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import "./ExpenseForm.scss";

@observer
class ExpenseForm extends Component {
  @observable name = "";
  @observable category = "";
  @observable amount = 0;

  onCategoryChange = ({ target }) => {
    this.category = target.value;
  }

  onAmountChange = ({ target }) => {
    this.amount = target.value;
  }

  onNameChange = ({ target }) => {
    this.name = target.value;
  }

  onButtonClick = () => {
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
          <select onChange={this.onCategoryChange}>
            <option>Nieplanowane</option>
            <option>Jedzenie</option>
            <option>Rachunki</option>
          </select>
        </div>
        <div className="form-child">
          <label>Nazwa</label>
          <input type="text" onChange={this.onNameChange} />
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