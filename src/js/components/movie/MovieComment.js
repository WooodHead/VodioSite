import React from "react";
import Comment from "./Comment";

export default class MovieComment extends React.Component {
  render() {
    return (
      <div className="single-product-dec-content">
        <div id="comments">
          <h2>۵ دیدگاه ثبت شده است</h2>
          <div className="commentlist">
            <div
              className="comment even thread-even depth-1"
              id="li-comment-21"
            >
              <div id="comment-21" className="comment_container">
                <img
                  alt=""
                  src="http://2.gravatar.com/avatar/8271ab4520301e6c326e4935bb0c66c7?s=60&amp;d=mm&amp;r=g"
                  className="avatar avatar-60 photo"
                  width="60"
                  height="60"
                />
                <div className="comment-text">
                  <p className="meta">
                    <strong>علی رستمی</strong> <span>/</span>
                    <span>یکشنبه ۱۷ اردیبهشت </span>
                  </p>
                  <div className="description">
                    <p>واقعا سریال قشنگیه</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {sessionStorage.getItem("session") && <Comment />}
        </div>
      </div>
    );
  }
}
