import { observable, action } from "mobx";
import axios from "axios";
import uuid from "uuid/v4";
import { API_URL, DATE_FORMAT_API } from "../constants";
import { sortBy } from "../utils/sort";
import { Expense } from "../models/Expense";

class ExpensesStore {
  @observable expenses = [];

  loadData() {
    axios(`${API_URL}/expenses`).then(this.processData);
  }

  postExpense({ name, amount, category, date }) {
    return axios
      .post(`${API_URL}/expenses`, {
        id: uuid(),
        date: date.format(DATE_FORMAT_API),
        name,
        amount: Number(amount),
        category,
      }).then(this.addNew);
  }

  putExpense({ date, id, name, amount, category }) {
    axios.put(`${API_URL}/expenses/${id}`, {
      date,
      name,
      amount: Number(amount),
      category,
    });
  }

  deleteExpense(id) {
    axios.delete(`${API_URL}/expenses/${id}`).then(this.deleteFromStore.bind(this, id));
  }

  @action.bound
  processData({ data }) {
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

  @action.bound
  sort(direction, field) {
    this.expenses = sortBy(this.expenses, direction, field);
  }
}

export { ExpensesStore };
