import React from "react";
import "../../../css/infinite.css";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { MainUrl } from "../../util/RequestHandler";

@inject("session")
@observer
export default class SearchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: null,
      isLoading: false,
      count: 0,
      firstLoad: true
    };
  }

  componentDidMount() {
    this.props.session.showFooter = false;
    var url =
      MainUrl + "/Search.ashx?keyword=" + this.props.match.params.keyword;
    $.ajax({
      type: "GET",
      url: url,
      success: function(data, textStatus, request) {
        this.setState({ elements: data.data, firstLoad: false });
      }.bind(this),
      error: function(request, textStatus, errorThrown) {}
    });

    window.onscroll = function() {
      if (!this.state.firstLoad) {
        var d = document.documentElement;
        var height = d.scrollTop + $(window).height() - 90;
        var offset = $(".movie-list").innerHeight();

        if (offset < height && !this.state.isLoading) {
          this.setState({ isLoading: true });
          $.ajax({
            type: "GET",
            url: MainUrl + "/Search.ashx?keyword=" + url,
            success: function(data, textStatus, request) {
              this.setState({
                isLoading: false
              });
              var joint = this.state.elements.concat(data.data);
              this.setState({ elements: joint });
            }.bind(this),
            error: function(request, textStatus, errorThrown) {}
          });
        }
      }
    }.bind(this);
  }

  componentWillUnmount() {
    this.props.session.showFooter = true;
  }

  render() {
    var childElements = null;
    if (this.state.elements != null) {
      childElements = this.state.elements.map(
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
          {this.state.elements != null ? (
            childElements
          ) : (
            <div style={{ width: "100%", textAlign: "center" }}>
              نتیجه ای یافت نشد.
            </div>
          )}
          {this.state.isLoading && (
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
