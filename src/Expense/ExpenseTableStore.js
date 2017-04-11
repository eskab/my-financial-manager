import { observable, action } from "mobx";
import axios from "axios";

class ExpenseTableStore {
  @observable expenses = [];

  loadData() {
    axios.get("http://localhost:3000/expenses")
      .then(({ data }) => this.expenses = data);
  }
}

export { ExpenseTableStore };