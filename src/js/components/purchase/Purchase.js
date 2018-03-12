import React from "react";
import "../../../css/infinite.css";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { MainUrl } from "../../util/RequestHandler";
import ListIcon from "../../../img/List.svg";

@inject("session", "movieStore", "gaStore")
@observer
export default class Purchase extends React.Component {
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

  componentWillMount() {
    if (this.props.session.session == null) {
      this.props.session.history.push("/");
    }
  }

  componentDidMount() {
    this.props.gaStore.addPageView("/purchase")
    // this.props.session.showFooter = false;
    if (this.props.session.purchaseIsInitiating == true) {
      this.props.session.purchaseIsInitiating = false;
    } else {
      if (this.props.session.purchaseListUrl == "") {
        this.props.session.purchaseListUrl = MainUrl + "/userpurchases.ashx?";
      }
      this.props.session.purchaseOffset = 0;
      this.props.session.fetchPurchaseList();
    }

    window.onscroll = function () {
      if (!this.props.session.purchaseIsInitiating) {
        var d = document.documentElement;
        var height = d.scrollTop + $(window).height() - 90;
        var offset = $(".movie-list").innerHeight();
        if (
          offset < height &&
          !this.state.isLoading &&
          this.props.session.purchaseListElementsCount !=
          this.props.session.purchaseListElements.length
        ) {
          this.props.session.purchaseIsLoading = true;
          this.props.session.purchaseOffset =
            this.props.session.purchaseOffset + this.props.session.purchaseSize;
          this.props.session.fetchPurchaseList();
        }
      }
    }.bind(this);
  }

  componentWillUnmount() {
    // this.props.session.showFooter = true;
  }
  movieClicked(movieId) {
    this.props.movieStore.movieId = movieId;
    this.props.movieStore.fetchMovie();
  }

  render() {
    var childElements = null;
    if (this.props.session.purchaseListElements) {
      childElements = this.props.session.purchaseListElements.map(
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
                      MainUrl +
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
                    {element.title}
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
          <div class="header_title">{this.props.session.purchaseTitle}</div>
        </div>
        <div class="list-content-header">
          {this.props.session.purchaseListElements ? (
            childElements
          ) : (
              <div
                style={{ width: "100px", height: "100px", background: "red" }}
              />
            )}
          {this.props.session.purchaseIsLoading && (
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
          {this.props.session.purchaseListElementsCount == 0 ? (
            <div
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: "100px"
              }}
            >
              متاسفانه شما خریدی انجام نداده‌اید!
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
