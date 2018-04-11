import React, { Component } from "react";
import AgentsMovies from "./AgentMovies";
import { MainUrl } from "../../util/RequestHandler";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import clboard from '../../../img/clapperboard.png'

@inject("session", "gaStore", "movieStore")
@observer
export default class Agent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      elements: null
    };
  }
  componentWillMount() {
    $('body').css({ 'overflow-y': 'scroll' });
    $('body').css("background", "#eeeeee");
  }

  componentWillUnmount() {
    $('body').css({ 'overflow-y': 'inherit' }); $("body").css("background", "white");
  }

  componentDidMount() {
    document.title = "";
    this.props.session.showLoading = true;
    $.ajax({
      type: "GET",
      url: MainUrl + "/agent.ashx?id=" + this.props.match.params.id,
      success: function (data, textStatus, request) {
        this.setState({ result: data, elements: data.data.roles[0] });
        this.props.session.showLoading = false;
      }.bind(this),
      error: function (request, textStatus, errorThrown) { }
    });
  }

  filterClicked(e, filter) {
    var elems = Array.prototype.slice.call(document.getElementsByClassName("search-filter"))
    elems.forEach(element => {
      element.classList.remove("search-filter-active")
    });
    e.currentTarget.classList.add("search-filter-active")
    this.state.result.data.roles.forEach(element => {
      if (element.role == filter) {
        this.setState({ elements: element })
      }
    });
  }

  movieClicked(movieId) {
    this.props.movieStore.movieId = movieId;
    this.props.movieStore.fetchMovie();
  }

  render() {
    if (this.state.elements == null) {
      return <div />;
    } else {
      document.title = this.state.result.data.name;
      var childElements = null;
      childElements = this.state.elements.movies.map(
        function (element, l) {
          if (element != null) {
            var width = $(window).width();
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
              <div id={"element" + l} class="box movie-list-item" style={{ paddingRight: '5px', paddingLeft: '5px' }} key={l}>
                <Link
                  to={{ pathname: "/movie/" + element.id }}
                  onClick={this.movieClicked.bind(this, element.id)}
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
                        width +
                        "&height=" +
                        height
                      }
                    />
                  </span>
                  <div style={{ height: '15px' }}></div>
                </Link>
              </div>
            );
          }
        }.bind(this)
      );
    }


    return (

      <div class="movie-list vodio-container" style={{ paddingTop: "20px" }}>
        <div style={{
          position: 'relative',
          height: '30px',
          marginTop: '20px',
          display: 'block',
          width: '100%'
        }}>
          <img src={clboard} style={{
            width: '15px', float: 'right',
            marginTop: '5px',
            marginLeft: '10px',
            marginRight: '5px'
          }} />
          <div style={{
            fontSize: '13px',
            fontFamily: 'irsansbold', float: 'right',
            marginTop: '5px'
          }}>فیلم‌های</div>
          <div style={{
            fontSize: '13px',
            fontFamily: 'irsansbold',
            color: '#eb0089',
            marginRight: '10px',
            marginLeft: '5px',
            float: 'right',
            marginTop: '5px'
          }}>{this.state.result.data.name}</div>
          {this.state.result.data.roles.map((role, l) => {
            return <div key={l} onClick={(e) => this.filterClicked(e, role.role)} class={l == 0 ? "search-filter search-filter-active" : "search-filter"} > {role.role}</div>
          })}
        </div>

        <div class="list-content-header">
          {childElements}
        </div>
      </div>
    );
  }
}
