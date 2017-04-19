import React from "react";
import DevTools from "mobx-react-devtools";
import { ExpenseForm, ExpenseTableContainer } from "./features";
import { ExpensesStore } from "./stores";
import "./App.scss";

const expensesStore = new ExpensesStore();

const App = () =>
  <div className="main-container">
    <ExpenseForm store={expensesStore} />
    <ExpenseTableContainer store={expensesStore} />
    <DevTools />
  </div>;

export { App };
