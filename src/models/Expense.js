import { observable, action, reaction } from "mobx";
import moment from "moment";

class Expense {
  store;
  id;
  @observable date;
  @observable name;
  @observable amount;
  @observable category;

  constructor(store, { id, date, name, amount, category }) {
    this.store = store;
    this.id = id;
    this.date = moment(date);
    this.name = name;
    this.amount = amount;
    this.category = category;

    reaction(
      () => ({
        date: this.date,
        name: this.name,
        amount: this.amount,
        category: this.category
      }),
      () => this.store.putExpense(this),
      { name: "putModifiedExpense" }
    );
  }

  @action.bound
  updateDate(date) {
    this.date = date;
  }

  @action.bound
  updateName(name) {
    this.name = name;
  }

  @action.bound
  updateAmount(amount) {
    this.amount = amount;
  }

  @action.bound
  updateCategory(category) {
    this.category = category;
  }

  @action
  destroy() {
    this.store.deleteExpense(this.id);
  }
}

export { Expense };
