import { observable, action } from "mobx";
import axios from "axios";
import uuid from "uuid/v4";
import { API_URL } from "../constants";
import { Expense } from "../models/Expense";

class ExpensesStore {
  @observable expenses = [];

  loadData() {
    axios(`${API_URL}/expenses`).then(this.mapData);
  }

  postNewExpense({ name, amount, category, date }) {
    return axios
      .post(`${API_URL}/expenses`, {
        id: uuid(),
        date: date.format("YYYY-MM-DD"),
        name,
        amount,
        category,
      }).then(this.addNew);
  }

  putExpense({ date, id, name, amount, category }) {
    axios.put(`${API_URL}/expenses/${id}`, {
      date,
      name,
      amount,
      category,
    });
  }

  deleteExpense(id) {
    axios.delete(`${API_URL}/expenses/${id}`).then(this.deleteFromStore.bind(this, id));
  }

  @action.bound
  mapData({ data }) {
    this.expenses = data.map(expense => new Expense(this, expense));
  }

  @action.bound
  addNew({ data }) {
    this.expenses.push(new Expense(this, data));
  }

  @action
  deleteFromStore(deletedExpenseId) {
    this.expenses = this.expenses.filter(({ id }) => id !== deletedExpenseId);
  }
}

export { ExpensesStore };
