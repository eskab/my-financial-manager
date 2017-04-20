import { ExpensesStore } from "../src/stores/ExpensesStore";
import moment from "moment";

describe("ExpenseStore", () => {
  let store;
  beforeEach(() => {
    store = new ExpensesStore();
    const expenses = [
      {
        "date": "2017-04-09T22:00:00.000Z",
        "name": "World is no yes",
        "amount": 1,
        "category": "Something",
        "id": "75c856e0-64e1-4114-87c2-d84e3142e1a6"
      },
      {
        "date": "2017-04-09T22:00:00.000Z",
        "name": "Global offensive",
        "amount": 3,
        "category": "Something",
        "id": "75c856e0-64e2-4114-87c2-d84e3142e1a6"
      }
    ];
    store.processData({ data: expenses });
  });
  it("is mapping to model", () => {
    expect(store.expenses[0].date).toEqual(moment("2017-04-09T22:00:00.000Z"));
    expect(store.expenses[0].name).toBe("World is no yes");
    expect(store.expenses[0].amount).toBe(1);
    expect(store.expenses[0].category).toBe("Something");
  });

  it("is deleting passed expense", () => {
    expect(store.expenses.length).toBe(2);

    store.deleteFromStore("75c856e0-64e2-4114-87c2-d84e3142e1a6");

    expect(store.expenses.length).toBe(1);
  })
});
