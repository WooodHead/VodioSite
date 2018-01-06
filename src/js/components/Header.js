import React, { Component } from "react";
import logo from "../../img/Logo.jpg";
import "bootstrap/dist/css/bootstrap.css";
import { MainUrl } from "../util/RequestHandler";
import { inject, observer } from "mobx-react";
import Search from "./search/Search";
import HeaderLogin from "./login/HeaderLogin";
import { Link } from "react-router-dom";

@inject("session")
@observer
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ""
    };
  }

  componentDidMount() {
    if (
      this.props.session.session != null &&
      this.props.session.session != ""
    ) {
      $(".header-login").hide();
      $("#sign-out").addClass("header-sign-out");
    } else {
      $(".header-login").show();
      $("#sign-out").removeClass("header-sign-out");
    }
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
              <div
                class="dropdown"
                id="sign-out"
                onClick={this.myFunction.bind(this)}
              />
              <div id="myDropdown" class="dropdown-content">
                <a href="#home">خریدها</a>
                <a href="#contact">پروفایل</a>
                <a onClick={this.signOutClicked.bind(this)}>خروج</a>
              </div>

              <HeaderLogin />
              <Search />
              <Category />
            </div>
            <span className="show-main-menu-btn icon-menu-1" />
          </div>
        </div>
        {/* <a class="test-popup-link" href="http://cinemamarket.ir/UploadedData/1/Contents/poster/Vilaeeha(Po-NLogo-1)-HTS-CinemaMarket.jpg">Open popup</a> */}
      </header>
    );
  }
}

var Category = React.createClass({
  closeMainMenu() {
    $(".header-category-drop-down").hide();
    $(".cover-page").show();
  },
  toggleCategory() {
    $(".header-category-drop-down").slideToggle(100);
    $(".cover-page").fadeToggle(100);
  },
  render() {
    return (
      <div className="header-category" onClick={this.toggleCategory}>
        <div className="header-category-show" id="header-category-show">
          <span>دسته‌بندی‌ها</span>
        </div>
        <div className="header-category-drop-down">
          <div
            className="closemainmenu"
            id="closemainmenu"
            onClick={this.closeMainMenu}
          />
          <ul className="header-category-drop-down-main-menu">
            <li className="header-category-drop-down-main-menu-item">
              <a href="#">
                <span className="icon-play-button hcdmmi-icon" />
                <strong>فیلم کوتاه</strong>
              </a>
              <SubCategory category="فیلم کوتاه" />
            </li>
            <li className="header-category-drop-down-main-menu-item">
              <a href="#">
                <span className="icon-television hcdmmi-icon" />
                <strong>مستند</strong>
              </a>
              <SubCategory category="مستند" />
            </li>
            <li className="header-category-drop-down-main-menu-item">
              <a href="#">
                <span className="icon-pussy-cat-cartoon-outline-variant hcdmmi-icon" />
                <strong>تئاتر</strong>
              </a>
              <SubCategory category="تئاتر" />
            </li>
            <li className="header-category-drop-down-main-menu-item">
              <a href="#">
                <span className="icon-video-camera hcdmmi-icon" />
                <strong>ویدیو آرت</strong>
              </a>
              <SubCategory category="ویدیو آرت" />
            </li>
          </ul>
        </div>
        <div class="cover-page" />
      </div>
    );
  }
});

var SubCategory = React.createClass({
  render() {
    return (
      <ul>
        <li>
          <a href="#">کمدی</a>
        </li>
        <li>
          <a href="#">جنایی</a>
        </li>
        <li>
          <a href="#">درام</a>
        </li>
        <li>
          <a href="#">عاشقانه</a>
        </li>
        <li>
          <a href="#">تاریخی</a>
        </li>
        <li>
          <a href="#">فانتزی</a>
        </li>
        <li>
          <a href="#">کوتاه</a>
        </li>
        <li>
          <a href="#">ماجرایی</a>
        </li>
        <li>
          <a href="#">موزیکال</a>
        </li>
        <li>
          <a href="#">تاریخی</a>
        </li>
        <li>
          <a href="#">فانتزی</a>
        </li>
        <li>
          <a href="#">کوتاه</a>
        </li>
        <li>
          <a href="#">ماجرایی</a>
        </li>
        <li>
          <a href="#">موزیکال</a>
        </li>
        <li>
          <a href="#">درام</a>
        </li>
        <li>
          <a href="#">عاشقانه</a>
        </li>
        <li>
          <a href="#">تاریخی</a>
        </li>
        <li>
          <a href="#">فانتزی</a>
        </li>
        <li>
          <a href="#">کوتاه</a>
        </li>
        <li>
          <a href="#">ماجرایی</a>
        </li>
      </ul>
    );
  }
});
