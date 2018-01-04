import "../css/style.css";
import "slick-carousel/slick/slick.css";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import "../javascript/script";
import "slick-carousel";
import Layout from "./components/Layout";

import sessionStore from "./stores/SesssionStore";

const app = document.getElementById("app");

ReactDOM.render(
  <Provider session={sessionStore}>
    <HashRouter>
      <Layout />
    </HashRouter>
  </Provider>,
  app
);
