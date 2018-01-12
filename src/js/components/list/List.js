import React from "react";
import "../../../css/infinite.css";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { MainUrl } from "../../util/RequestHandler";
import ListIcon from "../../../img/List.svg";

@inject("session")
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
    this.props.session.showFooter = false;
    console.log(this.props.session.isInitiating);
    if (this.props.session.isInitiating == true) {
      this.props.session.isInitiating = false;
    } else {
      if (this.props.session.listUrl == "") {
        this.props.session.listUrl = MainUrl + "/movielist.ashx?";
      }
      this.props.session.offset = 0;
      this.props.session.fetchList();
      console.log(this.props.session);
    }

    window.onscroll = function() {
      if (!this.props.session.isInitiating) {
        var d = document.documentElement;
        var height = d.scrollTop + $(window).height() - 90;
        var offset = $(".movie-list").innerHeight();
        if (offset < height && !this.state.isLoading) {
          this.props.session.isLoading = true;
          this.props.session.offset =
            this.props.session.offset + this.props.session.size;
          this.props.session.fetchList();
        }
      }
    }.bind(this);
  }

  componentWillUnmount() {
    this.props.session.showFooter = true;
  }

  render() {
    var childElements = null;
    if (this.props.session.listElements) {
      childElements = this.props.session.listElements.map(
        function(element, l) {
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
          return (
            <div class="box movie-list-item" key={l}>
              <Link
                to={{ pathname: "/movie/" + element.id }}
                class="movie-list-item-link"
              >
                <span class="movie-list-item-cover">
                  <img
                    class={"movie-list-item-img"}
                    src={
                      MainUrl +
                      "/image.ashx?file=" +
                      element.thumbnail.url +
                      "&width=" +
                      width
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
        </div>
      </div>
    );
  }
}
