import axios from "axios";
import uuid from "uuid/v4";
import { API_URL, DATE_FORMAT_API } from "../constants";

class ExpenditureService {

  static get() {
    return axios(ExpenditureService.serviceURL);
  }

  static post({ name, amount, category, date }) {
    return axios
      .post(ExpenditureService.serviceURL, {
        id: uuid(),
        date: date.format(DATE_FORMAT_API),
        name,
        amount: Number(amount),
        category,
      });
  }

  static put({ id, date, name, amount, category }) {
    return axios
      .put(`${ExpenditureService.serviceURL}/${id}`, {
        date,
        name,
        amount: Number(amount),
        category,
      });
  }

  static delete(id) {
    return axios
      .delete(`${ExpenditureService.serviceURL}/${id}`);
  }

  static get serviceURL() {
    return `${API_URL}/expenses`;
  }

}

export { ExpenditureService };
