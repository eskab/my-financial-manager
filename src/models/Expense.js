import { observable, action } from "mobx";

class Expense {
  store;
  id;
  date;
  @observable name;
  @observable amount;
  @observable category;
  @observable editMode;

  constructor(store, { id, date, name, amount, category }) {
    this.store = store;
    this.id = id;
    this.date = date;
    this.name = name;
    this.amount = amount;
    this.category = category;
    this.setEditModeToDefault();
  }

  @action
  toggleEditMode(fieldName) {
    this.editMode = {
      isActive: !this.editMode.isActive,
      fieldName: fieldName
    }
  }

  @action
  updateField(name, value) {
    this[name] = value;
    this.setEditModeToDefault();
    this.store.putExpense(this);
  }

  @action
  setEditModeToDefault() {
    this.editMode = { isActive: false, fieldName: null };
  }

  @action
  erase() {
    this.store.deleteExpense(this);
  }
}

export { Expense };
