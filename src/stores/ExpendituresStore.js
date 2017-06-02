import { observable, action, runInAction } from "mobx";
import { sortBy } from "../utils/sort";
import { Expenditure } from "../models/Expenditure";
import { ExpenditureService } from "../services/ExpenditureService";

// todo
// refactor async methods

class ExpendituresStore {
  @observable expenditures = [];

  @action
  async fetchData() {
    try {
      const response = await ExpenditureService.get();

      runInAction("fetchData", () => {
        this.processData(response);
      });
    } catch (error) {
      console.debug("An error occured", error);
    }
  }

  @action
  async postExpense(expenseData) {
    try {
      const response = await ExpenditureService.post(expenseData);

      runInAction("postExpense", () => {
        this.insertToStore(response);
      });
    } catch (error) {
      console.debug("An error occured", error);
    }
  }

  @action
  async putExpense(expenseData) {
    try {
      await ExpenditureService.put(expenseData);

      runInAction("putExpense", () => {});
    } catch (error) {
      console.debug("An error occured", error);
    }
  }

  @action
  async deleteExpense(id) {
    try {
      await ExpenditureService.delete(id);

      runInAction("deleteExpense", () => {
        this.deleteFromStore(id);
      });
    } catch (error) {
      console.debug("An error occured", error);
    }
  }

  @action
  processData({ data }) {
    this.expenditures = data.map(expense => new Expenditure(this, expense));
  }

  @action
  insertToStore({ data }) {
    this.expenditures.push(new Expenditure(this, data));
  }

  @action
  deleteFromStore(deletedExpenseId) {
    this.expenditures = this.expenditures.filter(({ id }) => id !== deletedExpenseId);
  }

  @action
  sort({ field, direction }) {
    this.expenditures = sortBy(this.expenditures, direction, field);
  }
}

export { ExpendituresStore };
