import React, { Component } from "react";

import { instanceOf } from "prop-types";
import { inject, observer } from "mobx-react";
import { Switch, Route, withRouter } from "react-router-dom";
import Login from "./login/Login";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./main/Main";
import Movie from "./movie/Movie";
import Agent from "./agent/Agent";
import List from "./list/List";

@inject("session")
@withRouter
@observer
class Layout extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Header />
        <div class="main-holder">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/movie/:id" component={Movie} />
            <Route path="/agent/:id" component={Agent} />
            <Route path="/list" component={List} />
          </Switch>
        </div>
        {this.props.session.showFooter && <Footer />}
        {this.props.session.showLogin && <Login />}
      </div>
    );
  }
}

export default Layout;
