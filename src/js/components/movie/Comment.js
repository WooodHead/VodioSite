import React from "react";

export default class Comment extends React.Component {
  render() {
    return (
      <div id="review_form">
        <div id="respond" className="comment-respond">
          <h3 id="reply-title" className="comment-reply-title">
            دیدگاه خود را بیان کنید!
          </h3>
          <form method="post" id="commentform" className="comment-form">
            <textarea
              className="comment-text-box"
              id="comment"
              name="comment"
              cols="45"
              rows="5"
              placeholder="دیدگاه شما..."
            />
            <input
              className="name-email"
              id="author"
              name="author"
              value=""
              size="30"
              placeholder="نام..."
              type="text"
            />
            <input
              className="name-email"
              id="email"
              name="email"
              value=""
              size="30"
              placeholder="ایمیل..."
              type="text"
            />
            <br />
            <button name="submit" type="submit" id="submit" className="submit">
              ارسال نظر
            </button>
          </form>
        </div>
      </div>
    );
  }
}
