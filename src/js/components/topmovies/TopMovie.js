import React, { Component } from "react";
import { Link } from "react-router-dom";
import { latinToPersian, convertMillisecondToString } from "../../util/util";
import { MainUrl } from "../../util/RequestHandler";
import { inject, observer } from "mobx-react";

@inject("movieStore", "session")
@observer
export default class TopMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      durationString: "",
      director: null,
      researcher: null,
      provider: null,
      actors: null
    };
  }

  componentDidMount() {
    this.setState({
      durationString: convertMillisecondToString(this.props.movie.duration)
    });
    var directorTemp;
    var ActorTemp;
    var providerTemp;
    var ResearcherTemp;
    if (this.props.movie.role != undefined) {
      $.each(this.props.movie, function(index, role) {
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
  }

  movieClicked(movieId) {
    console.log(this.props.movie);
    this.props.movieStore.movieId = movieId;
    this.props.movieStore.fetchMovie();
    this.props.session.history.push("/movie/" + movieId);
  }

  render() {
    return (
      <div className="top-moviez-inner">
        <div className="top-moviez-post">
          <a
            onClick={this.movieClicked.bind(this, this.props.movie.id)}
            className="top-moviez-post-inner"
          >
            <img
              src={
                MainUrl +
                "/image.ashx?file=" +
                this.props.movie.thumbnail.url +
                "&height=" +
                this.props.height +
                "&width=" +
                this.props.width
              }
              className="top-moviez-post-image"
            />
            <div className="top-moviez-post-top-layer">
              <div className="top-moviez-post-add">
                <ul className="top-moviez-post-top-ul">
                  <li>{this.props.movie.title}</li>
                  <li>{latinToPersian(this.state.durationString)}</li>
                  {this.props.movie.rate != 0 && (
                    <li>
                      {latinToPersian(this.props.movie.rate.toString())}
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
            </div>
          </a>
        </div>
      </div>
    );
  }
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
