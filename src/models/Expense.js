import { observable, action } from "mobx";
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
  }

  @action
  updateField(name, value) {
    this[name] = value;
    this.store.putExpense(this);
  }

  @action
  erase() {
    this.store.deleteExpense(this.id);
  }
}

export { Expense };
