import React from "react";
import "../../../css/login.css";
import { inject, observer } from "mobx-react";
import { latinToPersian, persianToLatin } from "../../util/util";
import Loading from "../loading/Loading";
import vodio from "../../../img/vodio.png";
import vodioLogo from "../../../img/login-logo.png";
import { MainUrl } from "../../util/RequestHandler";
import exit from "../../../img/exit.svg";
import timerLogo from "../../../img/Timer.svg";
import pointerLogo from "../../../img/pointer.png";
import editIcon from "../../../img/edit.svg";

@inject("session")
@observer
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: null,
      otpCode: "",
      showLoading: false,
      countDown: 60,
      showCountDown: false,
      countDownText: latinToPersian("00:60"),
      interval: null,
      retry: 0,
      vCaptcha: false,
      errorMessage: "",
      showMobileNumber: false,
      wrongCodeMessage: ""
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
      localStorage.setItem("msisdn", persianToLatin(this.state.mobileNumber));
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
            this.setState({ showMobileNumber: true });
            localStorage.setItem("otp", "1");
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
            if (data.errorCode == 1004) {
              this.setState({
                wrongCodeMessage:
                  "شما بیش از حد تلاش کردید.لطفا دوباره درخواست کد کنید."
              });
              $(".wrong-code").show(100);
            } else {
              this.setState({ showLoading: false });
              this.setState({ wrongCodeMessage: data.msg });
              $(".wrong-code").show(100);
            }
          } else if (data.data != null && data.data.canLogin == true) {
            this.props.session.session = data.data.token;
            this.props.session.showLogin = false;
            if (this.props.session.movieIdForPurchase != -1) {
              this.props.session.showLoading = true;
              var url =
                MainUrl +
                "/NextpayPurchaseHandler.ashx?movieId=" +
                this.props.session.movieIdForPurchase +
                "&token=" +
                this.props.session.session;
              this.props.session.movieIdForPurchase = -1;
              window.location.replace(url);
            }

            if (this.props.session.commentText != null) {
              $.ajax({
                type: "POST",
                headers: {
                  token: this.props.session.session
                },
                url: MainUrl + "/setcomment.ashx",
                data: JSON.stringify({
                  name:
                    $.trim(this.props.session.commentName) == ""
                      ? "بی نام"
                      : $.trim(this.state.this.props.sesssion.commentName),
                  text: this.props.session.commentText,
                  email: $.trim(this.props.session.commentEmail),
                  movieId: this.props.movieId
                }),
                dataType: "json",
                success: function(data, textStatus, jQxhr) {
                  if (data.errorCode != 0) {
                  } else {
                  }
                  this.props.onCommentSubmit();
                }.bind(this),
                error: function(jqXhr, textStatus, errorThrown) {
                  console.log(errorThrown);
                }
              });
              this.props.session.commentText = null;
              this.props.session.commentName = null;
              this.props.session.commentEmail = null;
            }
            localStorage.setItem("session", data.data.token);
            localStorage.removeItem("otp");
            window.location.reload();
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
    $("#mobile-input").on(
      "keyup",
      function(e) {
        if (e.keyCode == 13) {
          this.sendMobileNumber();
        }
      }.bind(this)
    );

    $("#codeNumber").on(
      "keydown",
      function(e) {
        if (e.keyCode == 13) {
          this.sendOtpCode();
        } else {
          $(".wrong-code").hide(100);
          $("#error-message").hide(100);
          if (
            ((e.keyCode >= 48 && e.keyCode <= 57) ||
              (e.keyCode >= 96 && e.keyCode <= 105)) &&
            this.state.otpCode.length < 4
          ) {
            this.setState({
              otpCode: latinToPersian(this.state.otpCode + e.key)
            });
          } else if (e.keyCode == 8) {
            var otpcode = this.state.otpCode.slice(0, -1);
            this.setState({ otpCode: otpcode });
          }
        }
      }.bind(this)
    );

    this.setState({ mobileNumber: localStorage.getItem("msisdn") });
    if (localStorage.getItem("otp") == "1") {
      $(".login").slideToggle();
      $(".register").slideToggle();
      $("#codeNumber").focus();

      this.setState({
        showLoading: false,
        countDown: 60,
        countDownText: latinToPersian("00:60"),
        retry: 1,
        showMobileNumber: true
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

  editClicked() {
    $(".login").slideToggle();
    $(".register").slideToggle();
    this.setState({ showMobileNumber: false });
  }

  render() {
    return (
      <div className="foodmoodbg" onClick={this.closeLogin.bind(this)}>
        {this.state.showLoading && <Loading />}
        <div className="container">
          <div className="foodmoodcontent">
            <div className="foodmoodform">
              {this.state.showMobileNumber && (
                <div
                  class="mobile-number"
                  onClick={this.editClicked.bind(this)}
                >
                  <img
                    style={{
                      width: "10px",
                      float: "right",
                      height: "18px",
                      marginLeft: "5px"
                    }}
                    src={editIcon}
                  />
                  <span
                    style={{
                      left: "0",
                      top: "0",
                      height: "15px",
                      float: "left"
                    }}
                  >
                    {latinToPersian(this.state.mobileNumber)}
                  </span>
                </div>
              )}
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
              <div id="error-message" class="wrong-code">
                {this.state.errorMessage}
              </div>
              <div className="login">
                <input
                  id="mobile-input"
                  type="text"
                  name="name"
                  value={this.state.mobileNumber}
                  onChange={this.mobileNumberChanged.bind(this)}
                  placeholder="شماره موبایل"
                />

                <p style={{ textAlign: "center", color: "white" }}>
                  برای عضویت در ودیو شماره موبایل خود را وارد کنید.
                </p>
                <button
                  className="submitfoodmood"
                  onClick={this.sendMobileNumber.bind(this)}
                >
                  ارسال
                </button>
              </div>
              <div className="register">
                <div class="wrong-code">{this.state.wrongCodeMessage}</div>
                <input
                  id="codeNumber"
                  type="text"
                  name="name"
                  value={this.state.otpCode}
                  placeholder="کد فعال سازی"
                />
                <p style={{ textAlign: "center", color: "white" }}>
                  کد فعال سازی برای شما ارسال شد.
                </p>
                <button
                  className="submitfoodmood"
                  onClick={this.sendOtpCode.bind(this)}
                >
                  ورود
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
                    <p style={{ textAlign: "center", color: "white" }}>
                      لطفا منتظر بمانید
                      <img
                        src={timerLogo}
                        style={{
                          width: "15px",
                          marginRight: "5px",
                          marginLeft: "5px"
                        }}
                      />
                      {this.state.showCountDown == true
                        ? this.state.countDownText
                        : null}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="foodmoodpicture">
              <img src={vodio} className="foodmoodpicture-img" />
              <div class="vodio-caption">
                <img src={pointerLogo} class="pointer" />
                <p
                  style={{
                    color: "white",
                    position: "absolute",
                    marginTop: "23px",
                    left: "55px",
                    float: "left"
                  }}
                >
                  A Trip to the Moon
                </p>
              </div>
            </div>
            <div />
          </div>
        </div>
      </div>
    );
  }
}
