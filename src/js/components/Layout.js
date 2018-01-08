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
import SearchList from "./search/SearchList";
import Vodio from "./vodio/Vodio";
import ContactUs from "./contact/ContactUs";

@inject("session")
@withRouter
@observer
class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.session.session =
      sessionStorage.getItem("session") != null
        ? sessionStorage.getItem("session")
        : null;
    this.props.session.history = this.props.history;
  }

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
            <Route path="/search/:keyword" component={SearchList} />
            <Route path="/vodio" component={Vodio} />
            <Route path="/ContactUs" component={ContactUs} />
          </Switch>
        </div>
        {this.props.session.showFooter && <Footer />}
        {this.props.session.showLogin && <Login />}
      </div>
    );
  }
}

export default Layout;
