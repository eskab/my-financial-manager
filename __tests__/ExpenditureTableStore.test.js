import { ExpenditureTableStore } from "../src/stores/ExpenditureTableStore";

describe("ExpenditureTableStore", function () {
  beforeEach(function() {
    this.store = new ExpenditureTableStore();
  });

  it("is enabling edit mode", function () {
    this.store.turnOnEditMode();

    expect(this.store.isInEditMode).toBe(true);
  });

  it("is disabling edit mode", function () {
    this.store.turnOffEditMode();

    expect(this.store.isInEditMode).toBe(false);
  });

  it("is setting passed object as edited", function () {
      this.store.enableEditMode({
      id: 123,
      fieldName: "date"
    });

    expect(this.store.isInEditMode).toBe(true);
    expect(this.store.editedColId).toBe(123);
    expect(this.store.editedFieldName).toBe("date");
  });

  it("is properly disabling edit mode", function () {
    this.store.enableEditMode({
      id: 123,
      fieldName: "date"
    });

    expect(this.store.isInEditMode).toBe(true);

    this.store.disableEditMode();

    expect(this.store.isInEditMode).toBe(false);
    expect(this.store.editedColId).toBe(null);
    expect(this.store.editedFieldName).toBe(null);
  });
});