import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { ExpendituresTable } from "./ExpendituresTable";

const ExpenditureTableContainer = observer(props =>
  <div className="expenses-table-container">
    <h3>Expenditure table</h3>
    <ExpendituresTable store={props.store} />
  </div>
);

ExpenditureTableContainer.propTypes = {
  store: PropTypes.object.isRequired
};

export { ExpenditureTableContainer };
