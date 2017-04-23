import axios from "axios";
import uuid from "uuid/v4";
import { API_URL, DATE_FORMAT_API } from "../constants";

class ExpensesService {

  static get() {
    return axios(ExpensesService.serviceURL);
  }

  static post({ name, amount, category, date }) {
    return axios
      .post(ExpensesService.serviceURL, {
        id: uuid(),
        date: date.format(DATE_FORMAT_API),
        name,
        amount: Number(amount),
        category,
      });
  }

  static put({ id, date, name, amount, category }) {
    return axios
      .put(`${ExpensesService.serviceURL}/${id}`, {
        date,
        name,
        amount: Number(amount),
        category,
      });
  }

  static delete(id) {
    return axios
      .delete(`${ExpensesService.serviceURL}/${id}`);
  }

  static get serviceURL() {
    return `${API_URL}/expenses`;
  }

}

export { ExpensesService };
