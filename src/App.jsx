import React from "react";
import DevTools from "mobx-react-devtools";
import { ExpenseForm, ExpenseTableContainer } from "./components";
import { ExpensesStore } from "./stores";
import "./App.scss";

const expensesStore = new ExpensesStore();

const App = () =>
  <div className="main-container">
    <ExpenseTableContainer store={expensesStore} />
    <ExpenseForm store={expensesStore} />
    <DevTools />
  </div>;

export { App };
