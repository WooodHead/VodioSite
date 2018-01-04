import React, { Component } from "react";
import Comment from "./Comment";
import { inject, observer } from "mobx-react";
import { latinToPersian, convertMillisecondToString } from "../../util/util";
var moment = require("moment-jalaali");

@inject("session")
@observer
export default class MovieComment extends React.Component {
  constructor() {
    super();
    this.state = { comments: null, commentCount: 0 };
  }

  showLogin() {
    this.props.session.showLogin = true;
  }

  getComments() {
    $.ajax({
      type: "Get",
      url: "http://localhost:58583/comments.ashx?movieId=" + this.props.movieId,
      success: function(data, textStatus, jQxhr) {
        if (data.errorCode != 0) {
        } else {
          if (data.data != null) {
            data.data.forEach(element => {
              var date = new Date(element.millisecond);

              var m = moment(
                date.getUTCFullYear() +
                  "/" +
                  (date.getUTCMonth() + 1) +
                  "/" +
                  date.getUTCDate(),
                "YYYY/M/D"
              );

              var month = "";
              switch (m.jMonth()) {
                case 0:
                  month = "فروردین";
                  break;
                case 1:
                  month = "اردیبهشت";
                  break;
                case 2:
                  month = "خرداد";
                  break;
                case 3:
                  month = "تیر";
                  break;
                case 4:
                  month = "مرداد";
                  break;
                case 5:
                  month = "شهریور";
                  break;
                case 6:
                  month = "مهر";
                  break;
                case 7:
                  month = "آبان";
                  break;
                case 8:
                  month = "آذر";
                  break;
                case 9:
                  month = "دی";
                  break;
                case 10:
                  month = "بهمن";
                  break;
                case 11:
                  month = "اسفند";
                  break;
                default:
                  break;
              }

              element.millisecond = latinToPersian(
                m.jDate() + " " + month + " " + m.jYear()
              );
            });
            this.setState({ comments: data.data, commentCount: data.count });
          }
        }
      }.bind(this),
      error: function(jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
  }

  componentDidMount() {
    this.getComments();
  }

  onCommentSubmit() {
    this.getComments();
  }

  render() {
    return (
      <div className="single-product-dec-content">
        {this.props.session.session == "" ? (
          <div className="register-panel">
            ثبت نظر فقط برای اعضا می باشد.
            <a className=" register-button" onClick={this.showLogin.bind(this)}>
              <strong> عضویت</strong>
            </a>
          </div>
        ) : (
          <Comment
            movieId={this.props.movieId}
            onCommentSubmit={this.onCommentSubmit.bind(this)}
          />
        )}
        {this.state.commentCount != 0 && (
          <div id="comments">
            <h2>
              {latinToPersian(this.state.commentCount.toString())} دیدگاه ثبت
              شده است
            </h2>
            <div className="commentlist">
              <div
                className="comment even thread-even depth-1"
                id="li-comment-21"
              >
                {this.state.comments.map(comment => (
                  <div
                    key={comment.id}
                    id="comment-21"
                    className="comment_container"
                  >
                    <img
                      alt=""
                      src="http://2.gravatar.com/avatar/8271ab4520301e6c326e4935bb0c66c7?s=60&amp;d=mm&amp;r=g"
                      className="avatar avatar-60 photo"
                      width="60"
                      height="60"
                    />
                    <div className="comment-text">
                      <p className="meta">
                        <strong>{comment.name}</strong> <span> / </span>
                        <span className="comment-date">
                          {comment.millisecond}{" "}
                        </span>
                      </p>
                      <div className="description">
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
