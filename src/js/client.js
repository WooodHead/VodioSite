import "../css/style.css";

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Switch, Route } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import "../javascript/script";
import Main from "./components/main/Main";
import Movie from "./components/movie/Movie";
import Layout from "./components/Layout";
import Agent from "./components/agent/Agent";

const app = document.getElementById("app");

ReactDOM.render(
  <HashRouter>
  <CookiesProvider>
    <Layout>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/movie/:id" component={Movie} />
        <Route path="/agent/:id" component={Agent} />
      </Switch>
    </Layout>
    </CookiesProvider>
  </HashRouter>,
  app
);
