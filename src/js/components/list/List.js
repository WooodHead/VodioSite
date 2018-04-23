import React from "react";
import "../../../css/infinite.css";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { MainUrl, MediaUrl } from "../../util/RequestHandler";
import ListIcon from "../../../img/List.svg";
import { latinToPersian, convertSecondToString } from "../../util/util";

@inject("session", "movieStore")
@observer
export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: "first",
      count: 0,
      firstLoad: true,
      offset: 0,
      size: 20
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.session.showFooter = false;
    if (this.props.session.isInitiating == true) {
      this.props.session.isInitiating = false;
    } else {
      if (this.props.session.listUrl == "") {
        var categoryId = this.props.match.params.categoryId - 1;
        var genreId = this.props.match.params.genreId - 1;
        this.props.session.listUrl = MainUrl + "/movielist.ashx?";
        if (categoryId >= 0) {
          this.props.session.listUrl += "categoryId=" + categoryId;
        }
        if (genreId >= 0) {
          if (categoryId >= 0) {
            this.props.session.listUrl += "&";
          }
          this.props.session.listUrl += "genreId=" + genreId;
        }
        $.ajax({
          type: "GET",
          url: MainUrl + "/category.ashx",
          success: function (data, textStatus, request) {
            data.data.forEach(category => {
              if (category.id == categoryId) {
                this.props.session.title = category.name;
                category.genres.forEach(genre => {
                  if (genre.id == genreId) {
                    this.props.session.title += " - " + genre.name;
                  }
                });
              }
            });
          }.bind(this),
          error: function (request, textStatus, errorThrown) { }
        });
      }
      this.props.session.offset = 0;
      this.props.session.fetchList(3);
    }

    window.onscroll = function () {
      if (!this.props.session.isInitiating) {
        var d = document.documentElement;
        var height = d.scrollTop + $(window).height() - 90;
        var offset = $(".movie-list").innerHeight();
        if (offset < height && !this.props.session.isLoading && this.props.session.count != this.props.session.offset) {
          this.props.session.isLoading = true;
          this.props.session.fetchList(4);
        }
      }
    }.bind(this);
  }
  componentWillUnmount() {
    document.title = "ودیو مرجع فیلم مستقل";
    this.props.session.showFooter = true;
  }

  movieClicked(movieId) {
    this.props.movieStore.movieId = movieId;
    this.props.movieStore.fetchMovie();
  }

  render() {
    var childElements = null;
    if (this.props.session.listElements) {
      document.title = "ودیو - " + this.props.session.title;
      childElements = this.props.session.listElements.map(
        function (element, l) {
          var width = $(".row-header").width();
          if (width > 1400) {
            width = width * 12.5 / 100;
          } else if (width > 1200) {
            width = width * 14.28 / 100;
          } else if (width > 1000) {
            width = width * 16.6 / 100;
          } else if (width > 600) {
            width = width * 25 / 100;
          } else if (width > 400) {
            width = width * 50 / 100;
          }
          width = Math.round(width);
          var height = Math.round(width / 11 * 16);
          return (
            <div class="box movie-list-item" key={l}>
              <Link
                to={{ pathname: "/movie/" + element.id }}
                class="movie-list-item-link"
                onClick={this.movieClicked.bind(this, element.id)}
              >
                <span class="movie-list-item-cover">
                  <img
                    class={"movie-list-item-img"}
                    src={
                      MediaUrl +
                      "/image.ashx?file=" +
                      element.thumbnail.url +
                      "&width=" +
                      width +
                      "&height=" +
                      height
                    }
                  />
                </span>
                <h2 class="movie-list-item-title">
                  <span class="movie-list-item-title-persian">
                    {latinToPersian(element.title)}
                  </span>
                  <span class="movie-list-item-title-english" />
                </h2>
              </Link>
            </div>
          );
        }.bind(this)
      );
    }

    return (
      <div class="movie-list">
        <div class="row-header">
          <img
            src={ListIcon}
            style={{
              width: "10px",
              marginRight: "10px",
              marginLeft: "5px"
            }}
          />
          <div class="header_title">{this.props.session.title}</div>
        </div>
        <div class="list-content-header">
          {this.props.session.listElements ? (
            childElements
          ) : (
              <div
                style={{ width: "100px", height: "100px", background: "red" }}
              />
            )}
          {this.props.session.isLoading && (
            <div class="box ">
              <div class="cssload-thecube-container-list">
                <div class="cssload-thecube-list">
                  <div class="cssload-cube cssload-c1" />
                  <div class="cssload-cube cssload-c2" />
                  <div class="cssload-cube cssload-c4" />
                  <div class="cssload-cube cssload-c3" />
                </div>
              </div>
            </div>
          )}
          {this.props.session.listElementsCount == 0 ? (
            <div style={{ textAlign: "center" }}>محتوایی جهت نمایش وجود ندارد.</div>
          ) : null}
        </div>
      </div>
    );
  }
}
