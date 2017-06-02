import { observable, action } from "mobx";

class ExpenditureTableStore {
  @observable isInEditMode;
  @observable editedColId;
  @observable editedFieldName;

  constructor() {
    this.isInEditMode = false;
    this.editedColId = null;
    this.editedFieldName = null;
  }

  @action.bound
  enableEditMode(editedObject) {
    this.toggleEditMode();
    this.setEditedObject(editedObject);
  }

  @action.bound
  disableEditMode() {
    this.toggleEditMode();
    this.setEditedObject({ id: null, fieldName: null });
  }

  @action
  toggleEditMode() {
    this.isInEditMode = !this.isInEditMode;
  }

  @action
  setEditedObject({ id, fieldName }) {
    this.editedColId = id;
    this.editedFieldName = fieldName;
  }
}

export { ExpenditureTableStore };
