import { observable, action } from "mobx";
import axios from "axios";

class ExpensesStore {
  @observable expenses = [];

  loadData() {
    axios("http://localhost:3000/expenses")
      .then(({ data }) => this.mapData(data));
  }

  @action
  mapData(data) {
    this.expenses = data;
  }

  @action
  addNew(data) {
    this.expenses.push(data);
  }
}

export { ExpensesStore };