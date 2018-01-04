import React from "react";
import "../../../css/login.css";
import { inject, observer } from 'mobx-react';
import { latinToPersian, persianToLatin } from "../../util/util";
import Loading from "../loading/Loading";

@inject('session')
@observer
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = { mobileNumber: null, otpCode: null, showLoading: false };
  }

  closeLogin(e) {
    if (
      $(e.target).attr("class") == "foodmoodbg" ||
      $(e.target).attr("class") == "close-animatedModal"
    ) {
      this.props.session.showLogin = false;
    }
  }

  sendMobileNumber() {
    this.setState({ showLoading: true });
    $.ajax({
      type: "GET",
      url:
        "http://localhost:58583/login.ashx?msisdn=" + persianToLatin(this.state.mobileNumber),
      success: function(data, textStatus, request) {
        if (data.errorCode != 0) {
        } else if (data.data != null && data.data.otpSent == true) {
          $(".login").slideToggle("40");
          $(".register").slideToggle("80");
          this.setState({ showLoading: false });
        }
      }.bind(this),
      error: function(request, textStatus, errorThrown) {}
    });
  }

  sendOtpCode() {
    this.setState({ showLoading: true });
    $.ajax({
      type: "GET",
      url:
        "http://localhost:58583/verify.ashx?msisdn=" +
        persianToLatin(this.state.mobileNumber) +
        "&code=" +
        persianToLatin(this.state.otpCode),
      success: function(data, textStatus, request) {
        console.log("data data data : " + data.data.token);
        this.setState({ showLoading: false });
        if (data.errorCode != 0) {
        } else if (data.data != null && data.data.canLogin == true) {
          this.props.session.session = data.data.token;
          this.props.session.showLogin = false;
        }
        
      }.bind(this),
      error: function(request, textStatus, errorThrown) {}
    });
  }

  otpCodeChanged(e) {
    if (
      $.isNumeric(persianToLatin(e.target.value)) &&
      e.target.value.length < 5
    ) {
      this.setState({ otpCode: latinToPersian(e.target.value) });
    }
  }

  mobileNumberChanged(e) {
    if (
      $.isNumeric(persianToLatin(e.target.value)) &&
      e.target.value.length < 12
    ) {
      this.setState({ mobileNumber: latinToPersian(e.target.value) });
    }
  }

  render() {
    return (
      <div className="foodmoodbg" onClick={this.closeLogin.bind(this)}>
        {this.state.showLoading && <Loading />}
        <div className="container">
          <div className="foodmoodcontent">
            <div className="foodmoodform">
              <button
                className="close-animatedModal"
                onClick={this.closeLogin.bind(this)}
              >
                X
              </button>
              <div className="foodmoodlogo">
                <img src="../../../img/Vodio-Logo.jpg" />
              </div>
              <div className="login">
                <input
                  type="text"
                  name="name"
                  value={this.state.mobileNumber}
                  onChange={this.mobileNumberChanged.bind(this)}
                  placeholder="شماره همراه"
                />

                <p style={{textAlign:'center'}}>برای عضویت در نت فیلم شماره همراه خود را وارد کنید.</p>
                <button
                  className="submitfoodmood"
                  onClick={this.sendMobileNumber.bind(this)}
                >
                  ارسال شماره
                </button>
              </div>
              <div className="register">
                <input
                  type="text"
                  name="name"
                  value={this.state.otpCode}
                  onChange={this.otpCodeChanged.bind(this)}
                  placeholder="کد فعال سازی"
                />

                <p style={{textAlign:'center'}}>کد فعال سازی برای شما ارسال سد.</p>
                <button
                  className="submitfoodmood"
                  onClick={this.sendOtpCode.bind(this)}
                >
                  ارسال کد فعال سازی
                </button>
              </div>
            </div>
            <div className="foodmoodpicture">
              <img src="../../../img/Vodio.jpg" />
            </div>
            <div />
          </div>
        </div>
      </div>
    );
  }
}
