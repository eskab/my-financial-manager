import { observable, action } from "mobx";
import axios from "axios";
import uuid from "uuid/v4";
import { API_URL } from "../constants";
import { Expense } from "../models/Expense";

class ExpensesStore {
  @observable expenses = [];

  loadData() {
    axios(`${API_URL}/expenses`)
      .then(({ data }) => this.mapData(data));
  }

  postNewExpense({ name, amount, category, date }) {
    return axios
      .post(`${API_URL}/expenses`, {
        id: uuid(),
        date: date.format("YYYY-MM-DD"),
        name,
        amount,
        category
      }).then(({ data }) => this.addNew(data));
  }

  putExpense({ date, id, name, amount, category }) {
    axios.put(`${API_URL}/expenses/${id}`, {
      date,
      name,
      amount,
      category
    });
  }

  deleteExpense({ id }) {
    axios.delete(`${API_URL}/expenses/${id}`).then(() => this.deleteFromStore(id));
  }

  @action
  mapData(data) {
    this.expenses = data.map(expense => new Expense(this, expense));
  }

  @action
  addNew(data) {
    this.expenses.push(new Expense(this, data));
  }

  @action
  deleteFromStore(deletedExpenseId) {
    this.expenses = this.expenses.filter(({ id }) => id !== deletedExpenseId);
  }
}

export { ExpensesStore };