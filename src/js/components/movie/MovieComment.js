import React, { Component } from "react";
import Comment from "./Comment";
import { inject, observer } from "mobx-react";
import { latinToPersian, convertSecondToString } from "../../util/util";
var moment = require("moment-jalaali");
import { MainUrl } from "../../util/RequestHandler";

@inject("session")
@observer
export default class MovieComment extends React.Component {
  constructor(props) {
    super(props);
  }

  showLogin() {
    this.props.session.showLogin = true;
  }

  componentDidMount() {
    this.props.session.commentMovieId = this.props.movieId;
    this.props.session.fetchCommentList();
  }

  onCommentSubmit() {
    this.props.session.fetchCommentList();
  }

  render() {
    return (
      <div className="single-product-dec-content">
        {/* {this.props.session.session == null ? (
          <div className="register-panel">
            ثبت نظر فقط برای اعضا می باشد.
            <a className=" register-button" onClick={this.showLogin.bind(this)}>
              <strong> عضویت</strong>
            </a>
          </div>
        ) : ( */}

        {this.props.session.commentListCount == 0 && (
          <div style={{ color: "gray" }}>اولین دیدگاه را شما ثبت کنید</div>
        )}
        {this.props.session.commentListCount != 0 && (
          <div id="comments">
            <h2>
              {latinToPersian(this.props.session.commentListCount.toString())}{" "}
              دیدگاه ثبت شده است
            </h2>
            <div className="commentlist">
              <div
                className="comment even thread-even depth-1"
                id="li-comment-21"
              >
                {this.props.session.commentList.map(comment => (
                  <div
                    key={comment.id}
                    id="comment-21"
                    className="comment_container"
                    style={{
                      width: "100%",
                      display: "inline-flex"
                    }}
                  >
                    <img
                      alt=""
                      src="http://2.gravatar.com/avatar/8271ab4520301e6c326e4935bb0c66c7?s=60&amp;d=mm&amp;r=g"
                      className="avatar avatar-60 photo"
                      width="60"
                      height="60"
                    />
                    <div
                      className="comment-text"
                      style={{
                        width: "calc(100% - 80px)",
                        float: "left",
                        borderBottom: "#caa7c1 1px solid",
                        paddingRight: "10px",
                        paddingBottom: "10px",
                        paddingTop: "0px"
                      }}
                    >
                      <p className="meta">
                        <strong>{comment.name}</strong> <span> </span>
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
        <Comment
          movieId={this.props.movieId}
          onCommentSubmit={this.onCommentSubmit.bind(this)}
        />
      </div>
    );
  }
}
