import React, { Component } from "react";
import { latinToPersian, persianToLatin } from "../util/util";
import { ToastContainer, toast, style } from "react-toastify";
import logo from "../../img/Logo.jpg";
import "bootstrap/dist/css/bootstrap.css";
import MainUrl from "../util/RequestHandler";

export default class Header extends React.Component {
  notify() {
    style({
      colorProgressDefault: "linear-gradient(to right, #fff , #eb0089)",
      TOP_LEFT: {
        top: "4.4em",
        left: "7.7em"
      },
      width: 288,
      zIndex: 9999
    });
    if (!toast.isActive(this.state.toastId)) {
      toast("کد فعال سازی برای شما پیامک شد.لطفا کد را وارد کنید.", {
        position: toast.POSITION.TOP_LEFT,
        closeButton: false
      });
    }
  }

  constructor() {
    super();
    sessionStorage.removeItem("login");
    this.state = {
      msisdn: "",
      code: "",
      toastId: null,
      textLoginInputValue: "",
      textLoginPlaceholderInputValue: "شماره همراه خود را وارد کنید",
      closeNotify: false
    };
  }

  componentDidMount() {}

  closeMainMenu() {
    $(".header-category-drop-down").hide();
  }

  loginClicked() {
    $("#login-header-input-id").addClass("login-header-input-disabled");
    $("#login-header-input-id").removeClass("login-header-input");
    $(".login-header-submit").hide();
    $(".loader-container").css("display", "block");

    if (sessionStorage.getItem("login") == "CODE_SENT") {
      this.update;
      $.ajax({
        type: "GET",
        url:
          MainUrl +
          "/verify.ashx?msisdn=" +
          this.state.msisdn +
          "&code=" +
          persianToLatin(this.state.code),
        success: function(data, textStatus, request) {
          this.setState({ login: data });
          this.setState({ closeNotify: true });
          sessionStorage.setItem("session", data.data.token);
          $("#sign-out").addClass("header-sign-out");
          $(".header-login-drop").hide(200);
          sessionStorage.setItem("login", "LOGGED_IN");
        }.bind(this),
        error: function(request, textStatus, errorThrown) {}
      });
    } else {
      $.ajax({
        type: "GET",
        url: MainUrl + "/login.ashx?msisdn=" + this.state.msisdn,
        success: function(data, textStatus, request) {
          this.setState({ login: data });
          this.notify();
          $("#login-header-input-id").addClass("login-header-input");
          $("#login-header-input-id").removeClass(
            "login-header-input-disabled"
          );
          this.setState({
            textLoginInputValue: "",
            textLoginPlaceholderInputValue: "کد فعال سازی ..."
          });
          $(".login-header-submit").show();
          $(".loader-container").css("display", "none");
          sessionStorage.setItem("login", "CODE_SENT");
        }.bind(this),
        error: function(request, textStatus, errorThrown) {}
      });
    }
  }

  onLoginFieldChange(e) {
    if (sessionStorage.getItem("login") == "CODE_SENT") {
      this.setState({ code: e.target.value });
    } else {
      this.setState({ msisdn: e.target.value });
    }
    this.setState({ textLoginInputValue: latinToPersian(e.target.value) });
  }

  render() {
    return (
      <header id="header">
        {!this.state.closeNotify && (
          <ToastContainer
            toastClassName={{ font: " 500 .8em/40px 'IRSans',Sans-serif" }}
            autoClose={1}
          />
        )}
        <div className="header-inner max-width">
          <a href="#" className="logo" title="وودیو">
            <img
              style={{ width: "100px", height: "60px" }}
              src={logo}
              alt="وودیو"
            />
          </a>
          <div className="">
            <nav className="header-menu">
              <ul className="header-menu-ul">
                <li>
                  <a href="#">
                    <span className="home-icon-img" />
                    <div className="home-menu-title">صفحه‌اصلی</div>
                  </a>
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
              <div id="sign-out" className="" />
              <div className="header-login">
                <div className="header-login-win" />
                <div className="header-login-drop">
                  <form className="header-login-drop-form">
                    <input
                      id="header-login-input-id"
                      type="tel"
                      className="login-header-input"
                      value={this.state.textLoginInputValue}
                      placeholder={this.state.textLoginPlaceholderInputValue}
                      onChange={this.onLoginFieldChange.bind(this)}
                    />
                    <button
                      onClick={this.loginClicked.bind(this)}
                      className="login-header-submit"
                    />
                    <div className="loader-container">
                      <div className="loader" />
                    </div>
                  </form>
                  <div className="header-login-close" />
                </div>
              </div>

              <div className="header-search">
                <div className="header-search-show" />
                <div className="header-search-drop">
                  <form className="header-search-drop-form">
                    <input
                      type="text"
                      className="search-header-input"
                      placeholder="جستجو کن ..."
                    />

                    <button type="submit" className="search-header-submit" />
                  </form>

                  <div className="header-search-close" />
                </div>
              </div>
              <div className="header-category">
                <div className="header-category-show" id="header-category-show">
                  <span>دسته‌بندی‌ها</span>
                </div>
                <div className="header-category-drop-down">
                  <div
                    className="closemainmenu"
                    id="closemainmenu"
                    onClick={this.closeMainMenu.bind(this)}
                  />
                  <ul className="header-category-drop-down-main-menu">
                    <li className="header-category-drop-down-main-menu-item">
                      <a href="#">
                        <span className="icon-play-button hcdmmi-icon" />
                        <strong>فیلم</strong>
                      </a>
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
                    </li>
                    <li className="header-category-drop-down-main-menu-item">
                      <a href="#">
                        <span className="icon-television hcdmmi-icon" />
                        <strong>سریال</strong>
                      </a>
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
                      </ul>
                    </li>
                    <li className="header-category-drop-down-main-menu-item">
                      <a href="#">
                        <span className="icon-pussy-cat-cartoon-outline-variant hcdmmi-icon" />
                        <strong>انیمیشن</strong>
                      </a>
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
                      </ul>
                    </li>
                    <li className="header-category-drop-down-main-menu-item">
                      <a href="#">
                        <span className="icon-video-camera hcdmmi-icon" />
                        <strong>مستند‌ها</strong>
                      </a>
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
                      </ul>
                    </li>
                    <li className="header-category-drop-down-main-menu-item">
                      <a href="#">
                        <span className="icon-musical-note hcdmmi-icon" />
                        <strong>موزیک‌ویدیوها</strong>
                      </a>
                      <ul>
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
                    </li>
                    <li className="header-category-drop-down-main-menu-item">
                      <a href="#">
                        <span className="icon-game-pad-3 hcdmmi-icon" />
                        <strong>بازی‌ها</strong>
                      </a>
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
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <span className="show-main-menu-btn icon-menu-1" />
          </div>
        </div>
        {/* <a class="test-popup-link" href="http://cinemamarket.ir/UploadedData/1/Contents/poster/Vilaeeha(Po-NLogo-1)-HTS-CinemaMarket.jpg">Open popup</a> */}
      </header>
    );
  }
}
