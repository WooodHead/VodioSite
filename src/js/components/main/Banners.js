import React from "react";
import { MainUrl } from "../../util/RequestHandler";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import OwlCarousel from "react-owl-carousel";

let dragging = false;

@inject("session", "movieStore", "gaStore")
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

  listClick(genreId, categoryId, title, bannerId) {
    if (!dragging) {
      var cId = 0;
      var gId = 0;
      if (categoryId != null) {
        cId = categoryId + 1;
      }
      if (genreId != null) {
        gId = genreId + 1;
      }
      this.props.session.gaUrl = "/list/" + cId + "/" + gId;
      this.props.session.offset = 0;
      var url = this.makeUrl(categoryId, genreId);
      this.props.session.listUrl = url;
      this.props.session.isInitiating = true;
      this.props.session.title = title;
      this.props.session.fetchList();
      this.props.gaStore.addEvent("Home", "click", "banner", bannerId.toString());
    }
  }

  movieClicked(movieId, bannerId) {
    if (!dragging) {
      this.props.movieStore.movieId = movieId;
      this.props.movieStore.fetchMovie();
      this.props.gaStore.addEvent("Home", "click", "banner", bannerId.toString());
    }
  }

  componentDidMount() {
    var width = $(window).width();
    if (width < 750) {
      $(".owl-dots").css("margin-top", "0");
      $(".owl-dots").css("display", "none");
    }
  }

  render() {
    var components = [];
    var width = window.screen.availWidth * window.devicePixelRatio;
    this.props.bundle.banners.forEach((banner, l) => {
      if (banner.urlToClick != null) {
        components.push(
          <a
            key={l}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (!dragging) window.location.replace(banner.urlToClick);
              this.props.gaStore.addEvent("Home", "click", "banner", banner.id.toString());
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
            onClick={this.movieClicked.bind(this, banner.movieId, banner.id)}
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
              banner.listName,
              banner.id
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
      <OwlCarousel className="owl-theme" rtlClass="rtlClass" loop items={1} autoplay>
        {components}
      </OwlCarousel>
    );
  }
}
