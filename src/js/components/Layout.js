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
import ErrorPage from "./error/ErrorPage";
import Loading from "./loading/Loading";
import MobileSearch from "./search/MobileSearch";

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
    this.fixedHeader();
  }

  fixedHeader() {
    var nav = $("#header");
    var mainHolder = $(".main-holder");
    var navHomeY = nav.offset().top;
    var isFixed = false;
    var $w = $(window);
    $w.scroll(function() {
      var scrollTop = $w.scrollTop();
      var shouldBeFixed = scrollTop > navHomeY;
      if (shouldBeFixed && !isFixed) {
        if($w.width() > 520){
          mainHolder.css({ margin: "100px auto 0" });
        }else{
          mainHolder.css({ margin: "150px auto 0" });
        }
        nav.css({
          position: "fixed",
          background: "rgba(255,255,255,1)",
          boxShadow: "0 20px 30px rgba(0,0,0,.1)",
          top: 0,
          left: nav.offset().left,
          width: nav.width()
        });
        isFixed = true;
      } else if (!shouldBeFixed && isFixed) {
        nav.css({
          position: "absolute",
          boxShadow: "none"
        });
        isFixed = false;
      }
    });
  }


  render() {
    return (
      <div>
        <Header />
        <div class="main-holder">
          <MobileSearch />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/movie/:id/:status?" component={Movie} />
            <Route path="/agent/:id" component={Agent} />
            <Route path="/list" component={List} />
            <Route path="/search/:keyword" component={SearchList} />
            <Route path="/vodio" component={Vodio} />
            <Route path="/ContactUs" component={ContactUs} />
            <Route path="/error" component={ErrorPage} />
          </Switch>
        </div>
        {this.props.session.showFooter && <Footer />}
        {this.props.session.showLogin && <Login />}
        {this.props.session.showLoading && <Loading />}
      </div>
    );
  }
}

export default Layout;
