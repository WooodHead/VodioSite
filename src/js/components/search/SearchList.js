import React from "react";
import "../../../css/infinite.css";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { MainUrl } from "../../util/RequestHandler";
import "jquery-visible";

@inject("session", "search")
@observer
export default class SearchList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.session.showFooter = false;

    window.onscroll = function() {
      if (
        this.props.search.elements != null &&
        this.props.search.elements.length != this.props.search.count &&
        $("#" + this.props.search.lastElementId).visible() &&
        this.props.search.isLoading == false
      ) {
        this.props.search.fetchNextSearchList();
      }
    }.bind(this);
  }

  componentWillUnmount() {
    this.props.session.showFooter = true;
  }

  render() {
    var childElements = null;
    if (this.props.search.elements != null) {
      childElements = this.props.search.elements.map(
        function(element, l) {
          if (element != null) {
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
              <div id={"element" + l} class="box movie-list-item" key={l}>
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
          }
        }.bind(this)
      );
    }

    return (
      <div class="movie-list">
        <div class="top-moviez-slide-title-background">
          <h5 class="top-moviez-slide-title">نتایج جستجو</h5>
        </div>
        <div class="list-content-header" style={{ width: "100%" }}>
          {this.props.search.elements != null && childElements}
          {this.props.search.count == 0 && (
            <div style={{ width: "100%", textAlign: "center" }}>
              نتیجه ای یافت نشد.
            </div>
          )}
          {this.props.search.isLoading && (
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
