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
      this.props.gaStore.addEvent("Movie", "click", "sendComment", this.props.movieId);
      if (this.props.session.session != null) {
        $.ajax({
          type: "POST",
          headers: {
            token: this.props.session.session
          },
          url: MainUrl + "/setcomment.ashx",
          data: JSON.stringify({
            name:
              $.trim(this.state.name) == ""
                ? "بی نام"
                : $.trim(this.state.name),
            text: this.state.text,
            email: $.trim(this.state.email),
            movieId: this.props.movieId
          }),
          dataType: "json",
          success: function (data, textStatus, jQxhr) {
            if (data.errorCode != 0) {
            } else {
            }
            this.props.gaStore.addEvent("Movie", "complete", "sendComment", this.props.movieId);
            this.props.session.commentMovieId = this.props.movieId;
            this.props.session.fetchCommentList();
          }.bind(this),
          error: function (request, textStatus, errorThrown) {
            if (request.status == 403) {
              this.props.session.session = null;
            }
          }.bind(this)
        });
      } else {
        this.props.session.commentMovieId = this.props.movieId;
        this.props.session.commentText = this.state.text;
        this.props.session.commentName = this.state.name;
        this.props.session.commentEmail = this.state.email;
        this.props.session.showLogin = true;
      }
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
          <div className="comment-form">
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
            <textarea
              className="comment-text-box"
              id="comment"
              name="comment"
              cols="43"
              rows="5"
              placeholder="دیدگاه شما..."
              onChange={this.textChange.bind(this)}
            />

            <button
              type="submit"
              id="submit"
              className="submit"
              onClick={this.sendComment.bind(this)}
            >
              ارسال نظر
            </button>
            <span id="text-validation" className="validation-error">
              لطفا نظر خود را وارد کنید
            </span>
          </div>
        </div>
      </div>
    );
  }
}
