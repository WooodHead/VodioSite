import React from "react";
import { MainUrl } from "../../util/RequestHandler";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import OwlCarousel from "react-owl-carousel";
import bannerImage from "../../../img/Banner Icon.png";
import Slider from 'react-slick';

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
    this.props.movieStore.movieId = movieId;
    this.props.movieStore.fetchMovie();
    this.props.gaStore.addEvent("Home", "click", "banner", bannerId.toString());
  }

  componentDidMount() {
    var width = $(window).width();
    if (width < 750) {
      $(".slick-dots").css("margin-top", "0");
      $(".slick-dots").css("display", "none");
    }
  }

  beforeChange() {
    dragging = true;
  }

  afterChange() {
    dragging = false;
  }

  render() {
    var components = [];
    var width = window.screen.availWidth * window.devicePixelRatio;
    this.props.bundle.banners.forEach((banner, l) => {
      if (banner.urlToClick != null) {
        components.push(
          <a
            key={l}
            style={{ cursor: "pointer", position: "relative" }}
            onClick={e => {
              if (!dragging) {
                this.props.gaStore.addEvent("Home", "click", "banner", banner.id.toString());
              } else {
                e.preventDefault();
              }
            }}
            href={banner.urlToClick}
          >

            <img
              style={{ width: "100%", pointerEvents: "none" }}
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
            onClick={e => {
              if (!dragging) {
                this.props.movieStore.movieId = banner.movieId;
                this.props.movieStore.fetchMovie();
                this.props.gaStore.addEvent("Home", "click", "banner", banner.id.toString());
              } else { e.preventDefault() }
            }}
            to={{ pathname: "/movie/" + banner.movieId }}
            style={{ position: "relative", width: "100%", cursor: "pointer" }}
          >
            <img
              style={{ width: "100%", pointerEvents: "none" }}
              src={
                MainUrl + "/image.ashx?file=" + banner.url + "&width=" + width
              }
            />
            <div style={{ pointerEvents: "none", position: "absolute", top: "0", right: "0", bottom: "0", left: "0", zIndex: "2" }}></div>

            <div class="banner-text-container" style={{ pointerEvents: "none" }}>
              <div style={{ display: 'inline-flex' }}><img class="banner-container-icon" src={bannerImage} /><div></div>{banner.title}</div>
              <div class="banner-container-description">{banner.description}</div>
            </div>
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

    var dots = true;
    if ($(window).width() < 750) {
      dots = false;
    }
    const settings = {
      dots: dots,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      rtl: false,
      afterChange: this.afterChange.bind(this),
      beforeChange: this.beforeChange.bind(this),
    };

    return (
      <Slider class="max-width-banner" {...settings}>
        {components}
      </Slider>
    );
  }
}
