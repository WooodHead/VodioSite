import React from "react";
import { Link } from "react-router-dom";
export default class TopMovie extends React.Component {

  render() {
    return (
      <div className="top-moviez-inner">
        <div className="top-moviez-post">
          <Link to={{pathname:"/movie/"+this.props.movie.id}} className="top-moviez-post-inner">
            <img
              src={this.props.movie.thumbnail.url}
              className="top-moviez-post-image"
              alt="Game Of Thrones"
            />
            <div className="top-moviez-post-top-layer">
              <div className="top-moviez-post-add">
                <ul className="top-moviez-post-top-ul">
                  <li>asdasd</li>
                  <li>asdf</li>
                  <li>asdf</li>
                  <li>asdf</li>
                  <li>asdf</li>
                  <li>asdf</li>
                </ul>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
