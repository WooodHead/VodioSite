import "./css/style.css";
import "slick-carousel/slick/slick.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import "./javascript/script";
import "slick-carousel";
import Layout from "./js/components/Layout";


import sessionStore from "./js/stores/SesssionStore";

const app = document.getElementById("conroot");

ReactDOM.render(
  <Provider session={sessionStore}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </Provider>,
  app
);
