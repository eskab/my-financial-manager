import { observable, action } from "mobx";
import axios from "axios";
import { API_URL } from "../constants";
import { Expense } from "../models/Expense";

class ExpensesStore {
  @observable expenses = [];

  loadData() {
    axios(`${API_URL}/expenses`)
      .then(({ data }) => this.mapData(data));
  }

  postNewExpense({ name, amount, category }) {
    axios.post(`${API_URL}/expenses`, {
      id: `${Math.random()}-${Math.random()}`,
      date: "2018-09-30",
      name,
      amount,
      category
    }).then(({ data }) => this.addNew(data));
  }

  putExpense({ id, name, amount, category }) {
    axios.put(`${API_URL}/expenses/${id}`, {
      date: "2018-09-30",
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