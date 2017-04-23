import { observable, action } from "mobx";
import { sortBy } from "../utils/sort";
import { Expense } from "../models/Expense";
import { ExpensesService } from "../services/ExpensesService";

class ExpensesStore {
  @observable expenses = [];

  fetchData() {
    ExpensesService.get().then(this.processData);
  }

  postExpense(expenseData) {
    return ExpensesService.post(expenseData).then(this.insertToStore);
  }

  putExpense(expenseData) {
    ExpensesService.put(expenseData);
  }

  deleteExpense(id) {
    ExpensesService.delete(id).then(this.deleteFromStore.bind(this, id));
  }

  @action.bound
  processData({ data }) {
    this.expenses = data.map(expense => new Expense(this, expense));
  }

  @action.bound
  insertToStore({ data }) {
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
