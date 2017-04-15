import { observable, action } from "mobx";

class Expense {
  store;
  id;
  date;
  @observable name;
  @observable amount;
  @observable category;

  constructor(store, { id, date, name, amount, category }) {
    this.store = store;
    this.id = id;
    this.date = date;
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
    this.store.deleteExpense(this);
  }
}

export { Expense };
