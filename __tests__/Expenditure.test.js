import moment from "moment";
import { Expenditure } from "../src/models/Expenditure";
import { ExpendituresStore } from "../src/stores/ExpendituresStore";

describe("ExpenditureModel", function () {
  beforeEach(function () {
    const expenditure = {
      "id": "6fcffb7b-41a4-4d6b-95a6-9a9e46a8ddd3",
      "date": "2017-04-10T22:00:00.000Z",
      "name": "Katowice is yes",
      "amount": 1,
      "category": "Testing",
    };
    this.model = new Expenditure(new ExpendituresStore(), expenditure);
  });

  it("is updating date", function () {
    expect(this.model.date).toEqual(moment("2017-04-10T22:00:00.000Z"));

    this.model.updateDate(moment("2017-04-01T00:00:00.000Z"));

    expect(this.model.date).toEqual(moment("2017-04-01T00:00:00.000Z"));
  });

  it("is updating name", function () {
    expect(this.model.name).toBe("Katowice is yes");

    this.model.updateName("New name for that position");

    expect(this.model.name).toBe("New name for that position");
  });

  it("is updating amount", function () {
    expect(this.model.amount).toBe(1);

    this.model.updateAmount(5);

    expect(this.model.amount).toBe(5);
  });

  it("is updating category", function () {
    expect(this.model.category).toBe("Testing");

    this.model.updateCategory("Testing 2000");

    expect(this.model.category).toBe("Testing 2000");
  });
});