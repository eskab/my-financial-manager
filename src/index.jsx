import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { useStrict } from "mobx";
import { Provider } from "mobx-react";
import { App } from "./App";
import { ExpenditureTableStore } from "./stores";

useStrict(true);

// move this
const expenditureTableStore = new ExpenditureTableStore();

render(
  <AppContainer>
    <Provider
      expenditureTableStore={expenditureTableStore}
    >
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;

    render(
      <AppContainer>
        <Provider
          expenditureTableStore={expenditureTableStore}
        >
          <NextApp appState={appState} />
        </Provider>
      </AppContainer>,
      document.getElementById("root")
    );
  });
}
