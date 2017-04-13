import { observable } from "mobx";

class Expense {
  id;
  date;
  @observable name;
  @observable amount;
  @observable category;
  @observable editMode;

  constructor({ id, date, name, amount, category }) {
    this.id = id;
    this.date = date;
    this.name = name;
    this.amount = amount;
    this.category = category;
    this.editMode = { isActive: false, fieldName: null };
  }

  toggleEditMode(fieldName) {
    this.editMode = {
      isActive: !this.editMode.isActive,
      fieldName: fieldName
    }
  }
}

export { Expense };
