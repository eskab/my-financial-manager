import React, { Component } from "react";
import DevTools from "mobx-react-devtools";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseTable } from "./components/ExpenseTable";
import { ExpensesStore } from "./stores";
import "./App.scss";

const expensesStore = new ExpensesStore();

const App = () =>
  <div className="main-container">
    <ExpenseTable store={expensesStore} />
    <ExpenseForm store={expensesStore} />
    <DevTools />
  </div>

export { App };
