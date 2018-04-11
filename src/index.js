import "./css/release.css";
import "./css/style.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import "./javascript/script";
import Layout from "./js/components/Layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SessionStore from "./js/stores/SessionStore";
import SearchStore from "./js/stores/SearchStore";
import MovieStore from "./js/stores/MovieStore";
import gaStore from "./js/stores/GoogleAnalyticsStore";

var sessionStore = new SessionStore(gaStore);
var movieStore = new MovieStore(sessionStore,gaStore);
var searchStore = new SearchStore(gaStore);
const store = {
  session: sessionStore,
  search: searchStore,
  movieStore: movieStore,
  gaStore: gaStore
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
