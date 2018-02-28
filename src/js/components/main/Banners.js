import React from "react";
import { MainUrl } from "../../util/RequestHandler";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import OwlCarousel from "react-owl-carousel";

let dragging = false;

@inject("session", "movieStore")
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
      this.props.movieStore.movieId = movieId;
      this.props.movieStore.fetchMovie();
    }
  }

  render() {
    var components = [];
    var width = $(window).width();
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
              src={
                MainUrl + "/image.ashx?file=" + banner.url + "&width=" + width
              }
            />
          </a>
        );
      } else if (banner.movieId != null && banner.movieId > 0) {
        components.push(
          <Link
            key={l}
            onClick={this.movieClicked.bind(this, banner.movieId)}
            to={{ pathname: "/movie/" + banner.movieId }}
          >
            <img
              style={{ width: "100%" }}
              src={
                MainUrl + "/image.ashx?file=" + banner.url + "&width=" + width
              }
            />
          </Link>
        );
      } else if (banner.genreId != null || banner.categoryId != null) {
        components.push(
          <Link
            style={{ cursor: "pointer" }}
            key={l}
            onClick={this.listClick.bind(
              this,
              banner.genreId,
              banner.categoryId,
              banner.listName
            )}
            to={{ pathname: "/List" }}
          >
            <img
              style={{ width: "100%" }}
              src={
                MainUrl + "/image.ashx?file=" + banner.url + "&width=" + width
              }
            />
          </Link>
        );
      }
    });

    return (
        <OwlCarousel className="owl-theme" rtlClass="rtlClass" loop items={1}>
          {components}
        </OwlCarousel>
    );
  }
}
