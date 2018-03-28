import React from "react";
import { MainUrl } from "../../util/RequestHandler";
import "../../../css/loading-fading.css";
import { inject, observer } from "mobx-react";

@inject("gaStore")
@observer
export default class FAQ extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      family: "",
      email: "",
      body: "",
      subject: "",
      errorInfo: "",
      successInfo: ""
    };
  }
  componentDidMount() {
    this.props.gaStore.addPageView("/faq");

    window.scrollTo(0, 0);
    $(".content-holder").css("background", "#dedede");
  }
  componentWillUnmount() {
    $(".content-holder").css("background", "white");
  }

  changeName(e) {
    this.setState({ name: e.target.value });
  }

  changeEmail(e) {
    this.setState({ email: e.target.value });
  }

  changefamily(e) {
    this.setState({ family: e.target.value });
  }

  changeQuestion(e) {
    this.setState({ body: e.target.value });
  }

  changeSubject(e) {
    this.setState({ subject: e.target.value });
  }
  sendEmail() {
    $("#loading").show();
    $.ajax({
      type: "POST",
      url: MainUrl + "/sendemail.ashx",
      data: JSON.stringify({
        name: this.state.name,
        family: this.state.text,
        email: $.trim(this.state.email),
        body: this.state.body,
        subject: this.state.subject,
        type:"سوال"
      }),
      dataType: "json",
      success: function (data, textStatus, jQxhr) {
        if (data.errorCode != 0) {
          this.setState({ errorInfo: data.msg });
          this.setState({ successInfo: "" });
        } else {
          this.setState({ successInfo: data.msg });
          this.setState({ errorInfo: "" });
        }
        $("#loading").hide();
      }.bind(this),
      error: function (request, textStatus, errorThrown) {
        this.setState({ errorInfo: "لطفا دوباره تلاش کنید" });
        $("#loading").hide();
      }.bind(this)
    });
  }
  render() {
    return (
      <div class="vodio-container">
        <h2 style={{ color: "#eb0089" }}>پرسش های متداول : </h2>
        <br />
        <h3 class="faq-question-title">
          نحوه ثبت‌نام در وب‌سایت ودیو چگونه است؟
        </h3>
        <p class="faq-answer">
          برای تهیه اشتراک در وب‌سایت ودیو ابتدا باید در این سایت ثبت‌نام کنید.
          به منظور ثبت‌نام و ایجاد حساب کاربری در مرحله اول به قسمت «ثبت‌نام»
          مراجعه کرده و در ادامه نسبت به ورود اطلاعات کاربری خود اعم از نام
          کاربری، رمز عبور، پست الکترونیکی و شماره تماس اقدام کنید.
        </p>
        <br />
        <h3 class="faq-question-title">
          مبلغ فیلم را پرداخت کرده‌ام، با این حال دسترسی من به فیلم ایجاده نشده
          است ، راه حل چیست؟
        </h3>
        <p class="faq-answer">
          در صورت بروز چنین مشکلی مبلغ پرداخت شده نهایتا تا 72 ساعت پس از واریز
          به حساب بانکی شما بازخواهد گشت. درغیر این صورت تصویری(اسکرین شات) از
          رسید پرداخت یا شماره ارجاع پرداخت و نام کاربری خود به ایمیل
          support@vodio.ir ارسال نمایید تا همکاران ما مشکل را پیگیری کرده و شما
          را از نتیجه مطلع نمایند.
        </p>
        <br />
        <div
          style={{
            padding: "10px",
            paddingTop: "80px"
          }}
        >
          <h3 style={{
            color: "#eb0089", maxWidth: '600px',
            borderTop: '1px solid #eee',
            height: '30px',
            paddingTop: '18px'
          }}>پاسخ خود را پیدا نکردید؟</h3>
          <p
            style={{
              margin: "20px",
              marginTop: "20px"
            }}
          >
            سوال خود را برای ما ارسال کنید.
          </p>
          <div style={{ maxWidth: "600px", minWidth: "200px", position: "relative" }}>
            <div id="loading" style={{ display: 'none' }}>
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'rgba(255,255,255,0.8)'
              }}
              >
                <div class="spinner" style={{
                  position: 'absolute',
                  top: 'calc(50% - 20px)',
                  right: 'calc(50% - 20px)'
                }}>
                </div>
              </div>
            </div>
            <div class="question-container">
              <div class="faq-name">
                <input
                  type="text"
                  class="faq-question-email faq-question-name"
                  placeholder="نام"
                  onChange={this.changeName.bind(this)}
                />
              </div>
              <div class="faq-name">
                <input
                  type="text"
                  class="faq-question-email"
                  placeholder="نام خانوادگی"
                  onChange={this.changefamily.bind(this)}
                />
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <input
                type="email"
                style={{ marginTop: "5px" }}
                class="faq-question-email"
                placeholder="ایمیل"
                onChange={this.changeEmail.bind(this)}
              />
            </div>
            <div style={{ width: "100%" }}>
              <input
                type="text"
                style={{ marginTop: "5px" }}
                class="faq-question-email"
                placeholder="موضوع سوال"
                onChange={this.changeSubject.bind(this)}
              />
            </div>
            <div style={{ width: "100%" }}>
              <textarea
                class="faq-question-text"
                cols="43"
                rows="5"
                placeholder="سوال خود را بنویسید"
                onChange={this.changeQuestion.bind(this)}
              />
            </div>
            <button class="faq-send-button" onClick={this.sendEmail.bind(this)}>
              ارسال
            </button>
            <div style={{ color: 'red' }}>
              {this.state.errorInfo}
            </div>
            <div style={{ color: 'green' }}>
              {this.state.successInfo}
            </div>
          </div>
        </div >
      </div >
    );
  }
}
