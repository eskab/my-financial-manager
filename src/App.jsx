import React from "react";
import DevTools from "mobx-react-devtools";
import { ExpenditureForm, ExpenditureTableContainer } from "./features";
import { ExpendituresStore } from "./stores";
import "./App.scss";

const expensesStore = new ExpendituresStore();

const App = () =>
  <div className="main-container">
    <ExpenditureForm store={expensesStore} />
    <ExpenditureTableContainer store={expensesStore} />
    <DevTools />
  </div>;

export { App };
