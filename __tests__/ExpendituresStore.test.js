import moment from "moment";
import { ExpendituresStore } from "../src/stores/ExpendituresStore";
import { ASCENDING, DESCENDING } from "../src/constants";

describe("ExpenditureStore", function() {
  beforeEach(function() {
    this.store = new ExpendituresStore();
    const expenditures = [
      {
        "id": "765c4fc8-2237-4a4c-b5e5-289035956f6e",
        "date": "2017-04-13T22:00:00.000Z",
        "name": "World is no yes",
        "amount": 1,
        "category": "Something",
      },
      {
        "id": "097068da-fd42-477a-bc04-345e03209129",
        "date": "2017-04-04T22:00:00.000Z",
        "name": "Global offensive",
        "amount": 3,
        "category": "Something",
      }
    ];
    this.store.processData({ data: expenditures });
  });

  it("is mapping to model", function() {
    expect(this.store.expenditures[0].date).toEqual(moment("2017-04-13T22:00:00.000Z"));
    expect(this.store.expenditures[0].name).toBe("World is no yes");
    expect(this.store.expenditures[0].amount).toBe(1);
    expect(this.store.expenditures[0].category).toBe("Something");
  });

  it("is deleting passed expense", function() {
    expect(this.store.expenditures.length).toBe(2);

    this.store.deleteFromStore("765c4fc8-2237-4a4c-b5e5-289035956f6e");

    expect(this.store.expenditures.length).toBe(1);
  });

  it("is inserting new expense", function() {
    const expense = {
      "id": "6fcffb7b-41a4-4d6b-95a6-9a9e46a8ddd3",
      "date": "2017-04-10T22:00:00.000Z",
      "name": "Katowice is yes",
      "amount": 1,
      "category": "Testing",
    };

    this.store.insertToStore({ data: expense });

    expect(this.store.expenditures.length).toBe(3);
  });

  it("sorts by date ascending correctly", function() {
    const expense = {
      "id": "6fcffb7b-41a4-4d6b-95a6-9a9e46a8ddd3",
      "date": "2017-04-10T22:00:00.000Z",
      "name": "Katowice is yes",
      "amount": 1,
      "category": "Testing",
    };
    this.store.insertToStore({ data: expense });

    expect(this.store.expenditures[0].id).toBe("765c4fc8-2237-4a4c-b5e5-289035956f6e");
    expect(this.store.expenditures[1].id).toBe("097068da-fd42-477a-bc04-345e03209129");
    expect(this.store.expenditures[2].id).toBe("6fcffb7b-41a4-4d6b-95a6-9a9e46a8ddd3");

    this.store.sort({
      field: "date",
      direction: ASCENDING
    });

    expect(this.store.expenditures[0].id).toBe("097068da-fd42-477a-bc04-345e03209129");
    expect(this.store.expenditures[1].id).toBe("6fcffb7b-41a4-4d6b-95a6-9a9e46a8ddd3");
    expect(this.store.expenditures[2].id).toBe("765c4fc8-2237-4a4c-b5e5-289035956f6e");
  });

  it("sorts by date descending correctly", function() {
    const expense = {
      "id": "6fcffb7b-41a4-4d6b-95a6-9a9e46a8ddd3",
      "date": "2017-04-10T22:00:00.000Z",
      "name": "Katowice is yes",
      "amount": 1,
      "category": "Testing",
    };
    this.store.insertToStore({ data: expense });

    expect(this.store.expenditures[0].id).toBe("765c4fc8-2237-4a4c-b5e5-289035956f6e");
    expect(this.store.expenditures[1].id).toBe("097068da-fd42-477a-bc04-345e03209129");
    expect(this.store.expenditures[2].id).toBe("6fcffb7b-41a4-4d6b-95a6-9a9e46a8ddd3");

    this.store.sort({
      field: "date",
      direction: DESCENDING
    });

    expect(this.store.expenditures[0].id).toBe("765c4fc8-2237-4a4c-b5e5-289035956f6e");
    expect(this.store.expenditures[1].id).toBe("6fcffb7b-41a4-4d6b-95a6-9a9e46a8ddd3");
    expect(this.store.expenditures[2].id).toBe("097068da-fd42-477a-bc04-345e03209129");
  });
});
