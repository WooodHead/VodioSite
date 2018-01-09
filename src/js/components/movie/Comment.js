import React, { Component } from "react";
import { MainUrl } from "../../util/RequestHandler";
import { inject, observer } from "mobx-react";

@inject("session")
@observer
export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "", email: "", name: "" };
  }
  sendComment() {
    if ($.trim(this.state.text) == "") {
      $("#text-validation").slideDown("100", "linear");
    } else {
      $.ajax({
        type: "POST",
        headers: {
          token: this.props.session.session
        },
        url: MainUrl + "/setcomment.ashx",
        data: JSON.stringify({
          name:
            $.trim(this.state.name) == "" ? "بی نام" : $.trim(this.state.name),
          text: this.state.text,
          email: $.trim(this.state.email),
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
    }
  }

  textChange(e) {
    this.setState({ text: e.target.value });
    if ($.trim(e.target.value) != "") {
      $("#text-validation").slideUp("100");
    }
  }

  nameChange(e) {
    this.setState({ name: e.target.value });
  }

  emailChange(e) {
    this.setState({ email: e.target.value });
  }

  render() {
    return (
      <div id="review_form">
        <div id="respond" className="comment-respond">
          <h3 id="reply-title" className="comment-reply-title">
            دیدگاه خود را بیان کنید!
          </h3>
          <div className="comment-form">
            <span id="text-validation" className="validation-error">
              لطفا نظر خود را وارد کنید
            </span>
            <textarea
              className="comment-text-box"
              id="comment"
              name="comment"
              cols="43"
              rows="5"
              placeholder="دیدگاه شما..."
              onChange={this.textChange.bind(this)}
            />

            <input
              className="name-email"
              id="author"
              name="author"
              size="30"
              placeholder="نام..."
              type="text"
              onChange={this.nameChange.bind(this)}
            />
            <input
              className="name-email"
              id="email"
              name="email"
              size="30"
              placeholder="ایمیل..."
              type="text"
              onChange={this.emailChange.bind(this)}
            />
            <br />
            <button
              type="submit"
              id="submit"
              className="submit"
              onClick={this.sendComment.bind(this)}
            >
              ارسال نظر
            </button>
          </div>
        </div>
      </div>
    );
  }
}
