import React from "react";
import { MainUrl } from "../../util/RequestHandler";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import OwlCarousel from "react-owl-carousel";

let dragging = false;

@inject("session")
@observer
export default class Banners extends React.Component {
  makeUrl(category, genre) {
    var url = MainUrl + "/movielist.ashx";
    if (category != null || genre != null) {
      url = url + "?";
    }
    if (category != null) {
      url = url + "categoryId=" + category;
    }
    if (genre != null) {
      url = url + "genreId=" + genre;
    }
    return url;
  }

  listClick(genreId, categoryId, title) {
    if (!dragging) {
      this.props.session.history.push("/list");
      this.props.session.offset = 0;
      var url = this.makeUrl(categoryId, genreId);
      this.props.session.listUrl = url;
      this.props.session.isInitiating = true;
      this.props.session.title = title;
      this.props.session.fetchList();
    }
  }

  movieClicked(movieId) {
    if (!dragging) {
      this.props.session.history.push("/movie" + movieId);
    }
  }

  render() {
    var components = [];
    this.props.bundle.banners.forEach((banner, l) => {
      if (banner.urlToClick != null) {
        components.push(
          <a
            key={l}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (!dragging) window.location.replace(banner.urlToClick);
            }}
          >
            <img
              style={{ width: "100%" }}
              src={MainUrl + "/image.ashx?file=" + banner.url}
            />
          </a>
        );
      } else if (banner.movieId != null && banner.movieId > 0) {
        components.push(
          <a key={l} onClick={this.movieClicked.bind(this, banner.movieId)}>
            <img
              style={{ width: "100%" }}
              src={MainUrl + "/image.ashx?file=" + banner.url}
            />
          </a>
        );
      } else if (banner.genreId != null || banner.categoryId != null) {
        components.push(
          <a
            style={{ cursor: "pointer" }}
            key={l}
            onClick={this.listClick.bind(
              this,
              banner.genreId,
              banner.categoryId,
              banner.listName
            )}
          >
            <img
              style={{ width: "100%" }}
              src={MainUrl + "/image.ashx?file=" + banner.url}
            />
          </a>
        );
      }
    });

    return (
      <OwlCarousel
        className="owl-theme"
        loop
        items={1}
        style={{
          direction: "ltr"
        }}
      >
        {components}
      </OwlCarousel>
    );
  }
}
