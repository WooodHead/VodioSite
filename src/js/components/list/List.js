import React from "react";
import "../../../css/infinite.css";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import MainUrl from '../../util/RequestHandler'

@inject("session")
@observer
export default class List extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      elements: [],
      isLoading: false,
      class: "first",
      count: 0
    };
  }

  componentDidMount() {
    this.props.session.showFooter = false;
    $.ajax({
      type: "GET",
      url: MainUrl+"/movielist.ashx",
      success: function(data, textStatus, request) {
        this.setState({ elements: data.data });
      }.bind(this),
      error: function(request, textStatus, errorThrown) {}
    });

    window.onscroll = function() {
      var d = document.documentElement;
      var height = d.scrollTop + $(window).height() - 90;
      var offset = $(".movie-list").innerHeight();

      // console.log("height : " + height + ", offset : " + offset);
      if (offset < height && !this.state.isLoading) {
        this.setState({ isLoading: true });
        $.ajax({
          type: "GET",
          url: MainUrl+"/movielist.ashx",
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
    }.bind(this);
  }

  componentWillUnmount() {
    this.props.session.showFooter = true;
  }

  render() {
    var childElements = this.state.elements.map(
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
            <Link to={{ pathname: "/movie/" }} class="movie-list-item-link">
              <span class="movie-list-item-cover">
                <img
                  class={"movie-list-item-img"}
                  src={
                    MainUrl+"/image.ashx?file=" +
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

    return (
      <div class="movie-list">
        <div class="row-header">
          <div class="header_title">لیست</div>
        </div>
        <div class="list-content-header">
          {childElements}
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
