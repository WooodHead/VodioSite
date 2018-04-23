import React, { Component } from "react";
import { Link } from "react-router-dom";
import { latinToPersian, convertSecondToString } from "../../util/util";
import { MainUrl, MediaUrl } from "../../util/RequestHandler";
import { inject, observer } from "mobx-react";

@inject("movieStore", "session", "gaStore")
@observer
export default class TopMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      durationString: "",
      director: null,
      researcher: null,
      provider: null,
      actors: null,
      elementId: makeid()
    };
  }

  componentDidMount() {
    this.setState({
      durationString: convertSecondToString(this.props.movie.duration)
    });
    var directorTemp;
    var ActorTemp;
    var providerTemp;
    var ResearcherTemp;
    if (this.props.movie.role != undefined) {
      $.each(this.props.movie, function (index, role) {
        if (role.name == "کارگردان") {
          directorTemp = role;
        } else if (role.name == "بازیگر") {
          ActorTemp = role;
        } else if (role.name == "تهیه کننده") {
          providerTemp = role;
        } else if (role.name == "پژوهشگر") {
          ResearcherTemp = role;
        }
      });
      this.setState({
        director: directorTemp,
        researcher: ResearcherTemp,
        provider: providerTemp,
        actors: ActorTemp
      });
    }

    var width = $(window).width();
    if (width > 750) {
      $(".top-moviez-inner" + this.state.elementId).hover(
        function () {
          $(".top-moviez-post-overlay" + this.state.elementId).css(
            "visibility",
            "visible"
          );
          $(".top-moviez-post-overlay" + this.state.elementId).css(
            "opacity",
            "1"
          );
          $(".top-moviez-post-title" + this.state.elementId).css(
            "top",
            "calc(45% - 20px)"
          );
          $(".top-moviez-post-director" + this.state.elementId).css(
            "top",
            "calc(50% - 20px)"
          );
        }.bind(this),
        function () {
          $(".top-moviez-post-overlay" + this.state.elementId).css(
            "opacity",
            "0"
          );
          $(".top-moviez-post-overlay" + this.state.elementId).css(
            "visibility",
            "hidden"
          );
          $(".top-moviez-post-title" + this.state.elementId).css(
            "top",
            "calc(60% - 20px)"
          );
          $(".top-moviez-post-director" + this.state.elementId).css(
            "top",
            "calc(75% - 20px)"
          );
        }.bind(this)
      );
    }
  }

  movieClicked(movieId, e) {
    if (this.props.session.topMovieDragging == true) {
      e.preventDefault();
    }
    this.props.gaStore.addEvent("HorizontalListBar - " + this.props.movie.title, "MovieItem", movieId.toString(), null);
    this.props.movieStore.movieId = movieId;
    this.props.movieStore.fetchMovie();
  }

  render() {
    var style = {
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: "2",
      opacity: "0",
      transition: "visibility 0.5s, opacity 0.5s linear",
      visibility: "hidden",
      background: "white"
    };

    var titleStyle = {
      position: "relative",
      top: "calc(60% - 20px)",
      color: "black",
      height: "40px",
      width: "100%",
      textAlign: "center",
      fontSize: "20px",
      transition: "top 0.3s linear",
      fontFamily: "IRSansBold",
      lineHeight: "1"
    };

    var directorStyle = {
      position: "relative",
      top: "calc(75% - 20px)",
      color: "black",
      height: "40px",
      width: "100%",
      textAlign: "center",
      fontSize: "14px",
      transition: "top 0.3s linear"
    };

    return (
      <div style={{ width: "100%" }} className={"top-moviez-inner" + this.state.elementId}>
        <Link
          draggable="false"
          to={{ pathname: "/movie/" + this.props.movie.id }}
          onClick={e => this.movieClicked(this.props.movie.id, e)}
          className="top-moviez-post-inner"
        >
          <div
            class={"top-moviez-post-overlay" + this.state.elementId}
            style={style}
          >
            <div
              class={"top-moviez-post-title" + this.state.elementId}
              style={titleStyle}
            >
              {latinToPersian(this.props.movie.title)}
            </div>
            {this.props.movie.directors && (
              <div
                class={"top-moviez-post-director" + this.state.elementId}
                style={directorStyle}
              >
                {this.props.movie.directors[0].name}
              </div>
            )}
          </div>

          <img
            src={
              MediaUrl +
              "/image.ashx?file=" +
              this.props.movie.thumbnail.url +
              "&height=" +
              this.props.height +
              "&width=" +
              this.props.width
            }
            className="top-moviez-post-image"
          />
          {/* <div className="top-moviez-post-top-layer">
              <div className="top-moviez-post-add">
                <ul className="top-moviez-post-top-ul">
                  <li>{this.props.movie.title}</li>
                  <li>{latinToPersian(this.state.durationString)}</li>
                  {this.props.movie.rate != 0 && (
                    <li>
                      {latinToPersian(this.props.movie.editorialRate.toString())}
                      &nbsp; امتیاز از &nbsp;
                      {latinToPersian(this.props.movie.ratedUsers.toString())}
                      &nbsp;کاربر&nbsp;
                    </li>
                  )}

                  {this.state.director != null ? (
                    <li>
                      <Director directors={this.state.director} />
                    </li>
                  ) : null}
                  {this.props.movie.genres != null ? (
                    <li>
                      <Genre genres={this.props.movie.genres} />
                    </li>
                  ) : null}
                </ul>
              </div>
            </div> */}
        </Link>
      </div>
    );
  }
}

function makeid() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

var Genre = React.createClass({
  render() {
    return (
      <div>
        <strong className="inline-class">ژانر : </strong>
        {this.props.genres.map((genre, l) => (
          <div className="inline-class" key={genre.id}>
            {genre.name}
            {this.props.genres.length - 1 != l ? (
              <p className="inline-class"> , </p>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
});

var Director = React.createClass({
  render() {
    return (
      <div>
        <strong className="inline-class">کارگردان : </strong>
        {this.props.directors.agents.map((director, l) => (
          <div className="inline-class" key={director.id}>
            <Link
              className="inline-class"
              to={{ pathname: "/agent/" + director.id }}
            >
              {director.name}
            </Link>
            {this.props.directors.agents.length - 1 != l ? (
              <p className="inline-class"> , </p>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
});
