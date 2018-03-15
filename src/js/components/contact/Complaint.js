import React from "react";
import { MainUrl } from "../../util/RequestHandler";
import "../../../css/loading-fading.css";
import { inject, observer } from "mobx-react";

@inject("gaStore")
@observer
export default class Complaint extends React.Component {
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
    this.props.gaStore.addPageView("/complaint");
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
        body: this.props.movieId,
        subject: this.props.movieId
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
      <div class="vodio-container" style={{ paddingTop: '65px' }}>
        <div
          style={{
            padding: "10px",
          }}
        >
          <h3 style={{ color: "#eb0089" }}></h3>
          <p
            style={{
              margin: "20px",
              marginTop: "20px"
            }}
          >
            مشکل خود را با ما در میان بگذارید
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
