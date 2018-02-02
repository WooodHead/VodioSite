import React from "react";
import { MainUrl } from "../../util/RequestHandler";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject("session")
@observer
export default class Banners extends React.Component {
  componentDidMount() {
    $(".banners").slick({
      infinite: true,
      speed: 300,
      autoPlay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      rtl: true,
      dots: true,
      adaptiveHeight: true
    });
  }

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
    this.props.session.history.push("/list");
    this.props.session.offset = 0;
    var url = this.makeUrl(categoryId, genreId);
    this.props.session.listUrl = url;
    this.props.session.isInitiating = true;
    this.props.session.title = title;
    this.props.session.fetchList();
  }

  render() {
    var components = [];
    this.props.bundle.banners.forEach((banner, l) => {
      if (banner.urlToClick != null) {
        components.push(
          <a
            key={l + new Date($.now())}
            style={{ cursor: "pointer" }}
            onClick={() => {
              window.location.replace(banner.urlToClick);
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
          <Link
            key={l + new Date($.now())}
            to={{ pathname: "/movie/" + banner.movieId }}
          >
            <img
              style={{ width: "100%" }}
              src={MainUrl + "/image.ashx?file=" + banner.url}
            />
          </Link>
        );
      } else if (banner.genreId != null || banner.categoryId != null) {
        components.push(
          <a
            style={{ cursor: "pointer" }}
            key={l + new Date($.now())}
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
      <div>
        <div class="banners">{components}</div>
      </div>
    );
  }
}
