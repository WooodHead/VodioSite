import React, { Component } from "react";
import logo from "../../img/Logo.jpg";
import "bootstrap/dist/css/bootstrap.css";
import { MainUrl } from "../util/RequestHandler";
import { inject, observer } from "mobx-react";
import Search from "./search/Search";
import HeaderLogin from "./login/HeaderLogin";
import { Link } from "react-router-dom";
import Category from "./Category";
import Loading from "./loading/Loading";

@inject("session")
@observer
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      categories: null
    };
  }

  componentDidMount() {
    setTimeout(
      function() {
        $.ajax({
          type: "GET",
          url: MainUrl + "/category.ashx",
          success: function(data, textStatus, request) {
            this.setState({
              categories: data.data
            });
          }.bind(this),
          error: function(request, textStatus, errorThrown) {}
        });
      }.bind(this),
      1000
    );
  }

  myFunction() {
    $("#myDropdown").toggle("show");
  }

  signOutClicked() {
    sessionStorage.removeItem("session");
    $(".header-login").show();
    $("#myDropdown").hide();
    $("#sign-out").removeClass("header-sign-out");
    this.props.session.session = null;

    $("#login-header-input-id").removeClass("login-header-input");
    $("#login-header-input-id").addClass("login-header-input-disabled");
    $(".login-header-submit").show();
    $(".loader-container").css("display", "none");
  }

  render() {
    return (
      <header id="header">
        <div className="header-inner max-width">
          <Link to={{ pathname: "/" }} className="logo" title="وودیو">
            <img
              style={{ width: "100px", height: "60px" }}
              src={logo}
              alt="وودیو"
            />
          </Link>
          <div className="">
            <nav className="header-menu">
              <ul className="header-menu-ul">
                <li>
                  <Link to={{ pathname: "/" }}>
                    <span className="home-icon-img" />
                    <div className="home-menu-title">صفحه‌اصلی</div>
                  </Link>
                </li>
                <li>
                  <a href="#">
                    <span className="help-icon-img" />
                    <div className="home-menu-title">راهنمای خرید</div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="ask-movie-icon-img" />
                    <div className="home-menu-title">درخواست فیلم</div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="contact-icon-img" />
                    <div className="home-menu-title">تماس با ما</div>
                  </a>
                </li>
              </ul>
            </nav>

            <div className="header-left-meta">
              {this.props.session.session != null &&
              this.props.session.session != "" ? (
                <div class="header-sign-out">
                  <div
                    class="dropdown"
                    id="sign-out"
                    class="header-sign-out"
                    onClick={this.myFunction.bind(this)}
                  />
                  <div id="myDropdown" class="dropdown-content">
                    <a href="#home">خریدها</a>
                    <a href="#contact">پروفایل</a>
                    <a onClick={this.signOutClicked.bind(this)}>خروج</a>
                  </div>
                </div>
              ) : (
                <HeaderLogin />
              )}
              <Search />
              <Category categories={this.state.categories} />
            </div>
            <span className="show-main-menu-btn icon-menu-1" />
          </div>
        </div>
        {/* <a class="test-popup-link" href="http://cinemamarket.ir/UploadedData/1/Contents/poster/Vilaeeha(Po-NLogo-1)-HTS-CinemaMarket.jpg">Open popup</a> */}
      </header>
    );
  }
}