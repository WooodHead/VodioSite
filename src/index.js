
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/release.css";
import "./css/style.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import "./javascript/script";
import Layout from "./js/components/Layout";

import sessionStore from "./js/stores/SesssionStore";
import searchStore from "./js/stores/SearchStore";

const store = {
  session: sessionStore,
  search: searchStore
};

const app = document.getElementById("conroot");

ReactDOM.render(
  <Provider {...store}>
    <HashRouter>
      <Layout />
    </HashRouter>
  </Provider>,
  app
);
