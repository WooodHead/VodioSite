import React from "react";
import "../../../css/login.css";
import { inject, observer } from "mobx-react";
import { latinToPersian, persianToLatin } from "../../util/util";
import Loading from "../loading/Loading";
import vodio from "../../../img/Vodio.jpg";
import vodioLogo from "../../../img/Vodio-Logo.jpg";
import { MainUrl } from "../../util/RequestHandler";
import exit from "../../../img/exit.svg";

@inject("session")
@observer
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: null,
      otpCode: null,
      showLoading: false,
      countDown: 60,
      showCountDown: false,
      countDownText: latinToPersian("00:60"),
      interval: null,
      retry: 0,
      vCaptcha: false,
      errorMessage: ""
    };
  }

  closeLogin(e) {
    if (
      $(e.target).attr("class") == "foodmoodbg" ||
      $(e.target).attr("class") == "closemodal"
    ) {
      this.props.session.showLogin = false;
    }
  }

  sendMobileNumber() {
    $("#error-message").hide(100);
    if ($.trim(this.state.mobileNumber) == "") {
      $("#mobile-input").addClass("no-input-shake");
      setTimeout(function() {
        $("#mobile-input").removeClass("no-input-shake");
      }, 500);
    } else if (
      $.trim(this.state.mobileNumber).length != 11 ||
      persianToLatin($.trim(this.state.mobileNumber)).match("^09") == null
    ) {
      this.setState({ errorMessage: "شماره صحیح نمی باشد" });
      $("#error-message").show(100);
    } else {
      sessionStorage.setItem("msisdn", persianToLatin(this.state.mobileNumber));
      var url =
        MainUrl +
        "/login.ashx?msisdn=" +
        persianToLatin(this.state.mobileNumber) +
        "&rs=1";
      this.setState({ showLoading: true });
      $.ajax({
        type: "GET",
        url: url,
        success: function(data, textStatus, request) {
          if (data.errorCode != 0) {
            this.setState({ showLoading: false, errorMessage: data.msg });
            $("#error-message").show(100);
          } else if (data.data != null && data.data.otpSent == true) {
            $(".login").slideToggle("40");
            $(".register").slideToggle("80");
            sessionStorage.setItem("otp", "1");
            this.setState({ retry: 1 });
            this.setState({ showLoading: false });
            this.setState({ showCountDown: true });
            var x = setInterval(
              function() {
                var count = this.state.countDown - 1;
                if (count == 0) {
                  this.setState({ showCountDown: false });
                  clearInterval(x);
                } else {
                  this.setState({ countDown: count });
                  if (count > 9) {
                    this.setState({
                      countDownText: latinToPersian(
                        "00:" + this.state.countDown
                      )
                    });
                  } else {
                    this.setState({
                      countDownText: latinToPersian(
                        "00:0" + this.state.countDown
                      )
                    });
                  }
                }
              }.bind(this),
              1000
            );
            this.setState({ interval: x });
          }
        }.bind(this),
        error: function(request, textStatus, errorThrown) {
          $("#error-message").show(100);
          this.setState({
            showLoading: false,
            errorMessage: "لطفا دوباره تلاش کنید"
          });
        }.bind(this)
      });
    }
  }

  sendOtpCode() {
    $("#error-message").hide(100);
    if ($.trim(this.state.otpCode) == "") {
      $("#codeNumber").addClass("no-input-shake");
      setTimeout(function() {
        $("#codeNumber").removeClass("no-input-shake");
      }, 500);
    } else {
      this.setState({ showLoading: true });
      $.ajax({
        type: "GET",
        url:
          MainUrl +
          "/verify.ashx?msisdn=" +
          persianToLatin(this.state.mobileNumber) +
          "&code=" +
          persianToLatin(this.state.otpCode),
        success: function(data, textStatus, request) {
          this.setState({ showLoading: false });
          if (data.errorCode != 0) {
            this.setState({ showLoading: false, errorMessage: data.msg });
          } else if (data.data != null && data.data.canLogin == true) {
            this.props.session.session = data.data.token;
            this.props.session.showLogin = false;
            sessionStorage.setItem("session", data.data.token);
            sessionStorage.removeItem("otp");
            sessionStorage.removeItem("msisdn");
          }
        }.bind(this),
        error: function(request, textStatus, errorThrown) {
          this.setState({
            showLoading: false,
            errorMessage: "لطفا دوباره تلاش کنید"
          });
        }.bind(this)
      });
    }
  }

  otpCodeChanged(e) {
    $("#error-message").hide(100);
    if ($.isNumeric(persianToLatin(e.target.value))) {
      this.setState({ otpCode: latinToPersian(e.target.value) });
    } else if (e.target.value == "") {
      this.setState({ otpCode: "" });
    }
  }

  mobileNumberChanged(e) {
    $("#error-message").hide(100);
    if ($.isNumeric(persianToLatin(e.target.value))) {
      this.setState({ mobileNumber: latinToPersian(e.target.value) });
    } else if (e.target.value == "") {
      this.setState({ mobileNumber: "" });
    }
  }

  resendCode(vc) {
    $("#error-message").hide(100);

    var url =
      MainUrl +
      "/login.ashx?msisdn=" +
      persianToLatin(this.state.mobileNumber) +
      "&vc=" +
      vc;
    this.setState({ showLoading: true });
    $.ajax({
      type: "GET",
      url: url,
      success: function(data, textStatus, request) {
        if (data.errorCode != 0) {
          this.setState({ showLoading: false, errorMessage: data.msg });
        } else if (data.data != null && data.data.otpSent == true) {
          this.setState({
            showLoading: false,
            countDown: 60,
            countDownText: latinToPersian("00:60"),
            retry: this.state.retry + 1
          });
          if (this.state.retry > 2) {
            this.setState({ vCaptcha: true });
          }
          this.setState({ showCountDown: true });
          var x = setInterval(
            function() {
              var count = this.state.countDown - 1;
              if (count == 0) {
                this.setState({ showCountDown: false });
                clearInterval(x);
              } else {
                this.setState({ countDown: count });
                if (count > 9) {
                  this.setState({
                    countDownText: latinToPersian("00:" + this.state.countDown)
                  });
                } else {
                  this.setState({
                    countDownText: latinToPersian("00:0" + this.state.countDown)
                  });
                }
              }
            }.bind(this),
            1000
          );
          this.setState({ interval: x });
        }
      }.bind(this),
      error: function(request, textStatus, errorThrown) {
        this.setState({
          showLoading: false,
          errorMessage: "لطفا دوباره تلاش کنید"
        });
      }.bind(this)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  componentDidMount() {
    this.setState({ mobileNumber: sessionStorage.getItem("msisdn") });
    if (sessionStorage.getItem("otp") == "1") {
      $(".login").slideToggle();
      $(".register").slideToggle();

      this.setState({
        showLoading: false,
        countDown: 60,
        countDownText: latinToPersian("00:60"),
        retry: 1
      });
      this.setState({ showCountDown: true });
      var x = setInterval(
        function() {
          var count = this.state.countDown - 1;
          if (count == 0) {
            this.setState({ showCountDown: false });
            clearInterval(x);
          } else {
            this.setState({ countDown: count });
            if (count > 9) {
              this.setState({
                countDownText: latinToPersian("00:" + this.state.countDown)
              });
            } else {
              this.setState({
                countDownText: latinToPersian("00:0" + this.state.countDown)
              });
            }
          }
        }.bind(this),
        1000
      );
    }
    this.setState({ interval: x });
  }

  render() {
    return (
      <div className="foodmoodbg" onClick={this.closeLogin.bind(this)}>
        {this.state.showLoading && <Loading />}
        <div className="container">
          <div className="foodmoodcontent">
            <div className="foodmoodform">
              <div className="close-animatedModal">
                <img
                  src={exit}
                  class="closemodal"
                  onClick={this.closeLogin.bind(this)}
                />
              </div>
              <div className="foodmoodlogo">
                <img src={vodioLogo} />
              </div>
              <div
                id="error-message"
                style={{
                  textAlign: "center",
                  color: "red",
                  display: "none"
                }}
              >
                {this.state.errorMessage}
              </div>
              <div className="login">
                <input
                  id="mobile-input"
                  type="text"
                  name="name"
                  value={this.state.mobileNumber}
                  onChange={this.mobileNumberChanged.bind(this)}
                  placeholder="شماره همراه"
                />

                <p style={{ textAlign: "center" }}>
                  برای عضویت در نت فیلم شماره همراه خود را وارد کنید.
                </p>
                <button
                  className="submitfoodmood"
                  onClick={this.sendMobileNumber.bind(this)}
                >
                  ارسال شماره همراه
                </button>
              </div>
              <div className="register">
                <input
                  id="codeNumber"
                  type="text"
                  name="name"
                  value={this.state.otpCode}
                  onChange={this.otpCodeChanged.bind(this)}
                  placeholder="کد فعال سازی"
                />
                <p style={{ textAlign: "center" }}>
                  کد فعال سازی برای شما ارسال سد.
                </p>
                <button
                  className="submitfoodmood"
                  onClick={this.sendOtpCode.bind(this)}
                >
                  ارسال کد فعال سازی
                </button>
                <div
                  style={{
                    display: "inline-block",
                    width: "100%",
                    textAlign: "center",
                    height: "60px"
                  }}
                >
                  {this.state.showCountDown == false ? (
                    <div>
                      <p>
                        <a
                          class="send-again"
                          onClick={this.resendCode.bind(this, 0)}
                        >
                          ارسال دوباره کد فعال سازی
                        </a>
                      </p>
                      {this.state.vCaptcha ? (
                        <p>
                          <a
                            class="send-again"
                            onClick={this.resendCode.bind(this, 1)}
                          >
                            برقراری تماس صوتی
                          </a>
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <p>لطفا منتظر بمانید</p>
                  )}
                  {this.state.showCountDown == true ? (
                    <p>{this.state.countDownText}</p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="foodmoodpicture">
              <img src={vodio} />
            </div>
            <div />
          </div>
        </div>
      </div>
    );
  }
}
