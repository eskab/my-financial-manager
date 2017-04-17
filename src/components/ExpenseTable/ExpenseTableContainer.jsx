import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { ExpenseTable } from "./ExpenseTable";

const ExpenseTableContainer = observer(props =>
  <div className="expenses-table-container">
    <h3>Tabela wydatków</h3>
    <ExpenseTable store={props.store} />
  </div>
);

ExpenseTableContainer.propTypes = {
  store: PropTypes.object.isRequired
};

export { ExpenseTableContainer };
