import React, { Component } from "react";
import logo from "../../img/vodio-logo.svg";
import { MainUrl } from "../util/RequestHandler";
import { inject, observer } from "mobx-react";
import Search from "./search/Search";
import HeaderLogin from "./login/HeaderLogin";
import { Link } from "react-router-dom";
import Category from "./Category";
import cancelImg from '../../img/cancel.png'
import appImg from '../../img/app-logo.svg'
import downloadAppImg from '../../img/download-app.svg'

@inject("session", "gaStore")
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
    if (/Android/i.test(navigator.userAgent)) {
      $("#header").css('height', $("#header").height() + 100)
    }
    $(window).click(
      function () {
        $("#myDropdown").hide(100);
      }.bind(this)
    );

    $(".header-sign-out").click(function (event) {
      event.stopPropagation();
    });

    $(".header-sign-out").click(function (event) {
      if ($("#myDropdown").css("display") == "none")
        this.props.gaStore.addEvent("Home", "click", "profileIcon");
      $("#myDropdown").toggle(100);
      event.stopPropagation();
    }.bind(this));
    $(window).click(function () {
      if ($(window).width() < 1001) {
        $(".header-menu").hide(100);
        $("#myDropdown").hide(100);
      }
    });

    $("#menucontainer").click(function (event) {
      event.stopPropagation();
    });

    setTimeout(
      function () {
        $.ajax({
          type: "GET",
          url: MainUrl + "/category.ashx",
          success: function (data, textStatus, request) {
            this.setState({
              categories: data.data
            });
            var width = $(window).width();
            if (width > 750) {
              data.data.map(category => {
                $("#" + category.id).hover(function () {
                  $("#" + "category" + category.id).css('display', 'inline')
                }, function () {
                  $("#" + "category" + category.id).css('display', 'none')
                })
              });
            }
            this.props.session.categories = data.data;
          }.bind(this),
          error: function (request, textStatus, errorThrown) { }
        });
      }.bind(this),
      1000
    );
  }

  signOutClicked() {
    this.props.gaStore.addEvent("Profile", "click", "exit");
    localStorage.removeItem("session");
    $(".header-login").show();
    $("#myDropdown").hide();
    $("#sign-out").removeClass("header-sign-out");
    this.props.session.session = null;

    $("#login-header-input-id").removeClass("login-header-input");
    $("#login-header-input-id").addClass("login-header-input-disabled");
    $(".login-header-submit").show();
    $(".loader-container").css("display", "none");
  }

  purchaseList() {
    this.props.gaStore.addEvent("Profile", "click", "purchases");
    this.props.session.history.push("/purchase");
    this.props.session.purchaseOffset = 0;
    this.props.session.purchaseListUrl = MainUrl + "/userpurchases.ashx?";
    this.props.session.purchaseIsInitiating = true;
    this.props.session.purchaseTitle = "خریدها";
    this.props.session.fetchPurchaseList();
    $("#myDropdown").hide(100);
  }

  factorList() {
    this.props.gaStore.addEvent("Profile", "click", "factors");
    this.props.session.history.push("/factors");
  }

  closeAppDownload() {
    $("#AppDownloadBar").css('display', 'none')
    $("#header").css('height', $("#header").height() - 100)
  }

  render() {
    return (
      <header id="header" style={{ background: "white" }}>
        {/Android/i.test(navigator.userAgent) && <div id="AppDownloadBar" style={{ width: '100%', height: '100px', background: '#e1e1e1' }}>
          <img src={cancelImg} style={{
            width: '15px',
            paddingRight: '10px',
            float: 'right',
            paddingTop: '42px',
            cursor: 'pointer'
          }} onClick={this.closeAppDownload.bind(this)} />
          <img src={appImg} style={{
            width: '65px',
            marginTop: '17px',
            float: 'right',
            marginRight: '10px'
          }} />
          <div style={{
            float: 'right',
            marginRight: '10px',
            marginTop: '20px'
          }}>
            <div style={{
              fontFamily: 'irsansbold',
              textAlign: 'right',
              fontSize: '22px'
            }}>ودیو</div>
            <div style={{
              textAlign: 'right',
              fontSize: '12px'
            }}>دریافت نسخه اندروید</div>
          </div>
          <div style={{
            width: '80px',
            border: '1px solid',
            borderRadius: '5px',
            padding: '4px 15px 4px 15px',
            float: 'left',
            marginTop: '30px',
            marginLeft: '20px',
            color: '#00c4b1',
            position: 'relative'
          }}>
            <a href="http://rabara.ir/vodio.apk" style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: '0',
              left: '0'
            }}>
            </a>
            <img style={{
              width: '20px',
              float: 'left',
              marginRight: '10px'
            }} src={downloadAppImg} />
            <div style={{ marginTop: '3px' }}>دانلود</div>
          </div>
        </div>}
        <div className="header-inner max-width">
          <Link to={{ pathname: "/" }} className="logo" title="وودیو">
            <img
              style={{
                width: '80px',
                height: '50px',
                marginTop: '10px'
              }}
              src={logo}
              alt="وودیو"
            />
          </Link>
          <span className="show-main-menu-btn icon-menu-1" />
          <Category categories={this.state.categories} />
          <div style={{
            paddingLeft: '10px'
          }} >
            {/* <nav className="header-menu">
              <ul className="header-menu-ul">
                <li>
                  <Link to={{ pathname: "/" }}>
                    <span className="home-icon-img" />
                    <div className="home-menu-title">صفحه‌اصلی</div>
                  </Link>
                </li>
                <li>
                  <a href="#">
                    <span className="ask-movie-icon-img" />
                    <div className="home-menu-title">درخواست فیلم</div>
                  </a>
                </li>
              </ul>
            </nav> */}
            <div
              style={{
                display: "inline-flex",
                float: "left",
                direction: "rtl"
              }}
            >
              <Search />
              <div className="header-left-meta">
                {this.props.session.session != null &&
                  this.props.session.session != "" ? (
                    <div class="header-sign-out-panel">
                      <div
                        class="dropdown"
                        id="sign-out"
                        class="header-sign-out"
                      />
                      <div id="myDropdown" class="dropdown-content">
                        <a onClick={this.purchaseList.bind(this)}>خریدها</a>
                        <a onClick={this.factorList.bind(this)}>فاکتورها</a>
                        {/* <a href="#contact">پروفایل</a> */}
                        <a onClick={this.signOutClicked.bind(this)}>خروج</a>
                      </div>
                    </div>
                  ) : (
                    <HeaderLogin />
                  )}
              </div>
            </div>
          </div>
        </div >
        {/* <a class="test-popup-link" href="http://cinemamarket.ir/UploadedData/1/Contents/poster/Vilaeeha(Po-NLogo-1)-HTS-CinemaMarket.jpg">Open popup</a> */}
      </header >
    );
  }
}
