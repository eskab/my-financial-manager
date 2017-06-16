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
    this.turnOnEditMode();
    this.setEditedObject(editedObject);
  }

  @action.bound
  disableEditMode() {
    this.turnOffEditMode();
    this.setEditedObject({ id: null, fieldName: null });
  }

  @action
  turnOnEditMode() {
    this.isInEditMode = true;
  }

  @action
  turnOffEditMode() {
    this.isInEditMode = false;
  }

  @action
  setEditedObject({ id, fieldName }) {
    this.editedColId = id;
    this.editedFieldName = fieldName;
  }
}

export { ExpenditureTableStore };
