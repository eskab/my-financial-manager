import React, { Component } from "react";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";
import { ExpenseTable, ExpenseTableStore } from "./Expense";

const expenseTableStore = new ExpenseTableStore();

@observer
class App extends Component {
  render() {
    return (
      <div>
        <ExpenseTable store={expenseTableStore} />
        <DevTools />
      </div>
    );
  }
};

export default App;
