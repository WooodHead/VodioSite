import React, { Component } from "react";
import MovieTeaser from "./MovieTeaser";
import MovieComment from "./MovieComment";
import { latinToPersian, convertMillisecondToString } from "../../util/util";
import TopMovies from "../topmovies/TopMovies";
import { Link } from "react-router-dom";
import { MainUrl } from "../../util/RequestHandler";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    this.state = {
      movie: null,
      movieId: id,
      durationString: "",
      movieDetailClicked: true,
      commentClicked: false,
      relatedMovies: null,
      director: null,
      researcher: null,
      actors: null,
      provider: null,
      loadPage: false
    };
  }

  onMovieDetailClick() {
    if (this.state.commentClicked) {
      this.setState({ movieDetailClicked: true, commentClicked: false });
      $("#tab-detail").addClass("current");
      $("#tab-comment").removeClass("current");
    }
  }

  onCommentClick() {
    if (this.state.movieDetailClicked) {
      this.setState({ movieDetailClicked: false, commentClicked: true });
      $("#tab-detail").removeClass("current");
      $("#tab-comment").addClass("current");
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    $.ajax({
      type: "GET",
      url: MainUrl + "/role.ashx?movieId=1",
      success: function(data, textStatus, request) {
        var directorTemp;
        var ActorTemp;
        var providerTemp;
        var ResearcherTemp;
        $.each(data.data, function(index, role) {
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
          actors: ActorTemp,
          loadPage: true
        });
      }.bind(this),
      error: function(request, textStatus, errorThrown) {}
    });

    $.ajax({
      type: "GET",
      url: MainUrl + "/movie.ashx?movieId=1",
      success: function(data, textStatus, request) {
        this.setState({ movie: data.data });
        this.setState({
          durationString: convertMillisecondToString(this.state.movie.duration)
        });
        $.ajax({
          type: "GET",
          url: MainUrl + "/related.ashx?movieId=" + this.state.movie.id,
          success: function(data, textStatus, request) {
            this.setState({ relatedMovies: data.data });
          }.bind(this),
          error: function(request, textStatus, errorThrown) {}
        });
      }.bind(this),
      error: function(request, textStatus, errorThrown) {}
    });

    $(document).ready(function() {
      $("#season-header-01-01").click(function() {
        $("#season-content-01-01").slideToggle("100");
      });
    });
    $(document).ready(function() {
      $("#season-header-01-02").click(function() {
        $("#season-content-01-02").slideToggle("100");
      });
    });
    $(document).ready(function() {
      $("#season-header-01-03").click(function() {
        $("#season-content-01-03").slideToggle("100");
      });
    });
  }

  render() {
    if (this.state.movie) {
      const videoStyle = { width: "100%", height: "400px", background: "red" };
      const posterStyle = { width: "100%" };
      return (
        <div>
          <div className="content-container max-width">
            <div className="content-inner">
              <div className="single-product-container">
                <div className="single-product-container-center">
                  <div class="movie-main-content-detail">
                    <div className="single-product-dec-content-text">
                      {this.state.movie.genres != null ? (
                        <Genre genres={this.state.movie.genres} />
                      ) : null}

                      {this.state.director != null ? (
                        <Director directors={this.state.director} />
                      ) : null}

                      {this.state.actors != null ? (
                        <Actor actors={this.state.actors} />
                      ) : null}

                      {this.state.provider != null ? (
                        <Provider providers={this.state.provider} />
                      ) : null}

                      {this.state.researcher != null ? (
                        <Researcher researchers={this.state.researcher} />
                      ) : null}

                      <div>
                        <strong>خلاصه داستان:</strong>{" "}
                        <p>{this.state.movie.description}</p>
                      </div>
                    </div>
                  </div>
                  <div class="movie-main-content-info">
                    <h1 className="single-product-title">
                      {this.state.movie.title}
                    </h1>
                    <div className="single-product-header-meta">
                      <span>{latinToPersian(this.state.durationString)} </span>
                      <span>
                        {this.state.movie.categories.map(category => (
                          <Link
                            to={{
                              pathname: "/List",
                              query: { name: category.name }
                            }}
                            className="single-product-category"
                            key={category.id}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </span>
                    </div>
                    <div className="single-product-score">
                      <span>
                        {latinToPersian(this.state.movie.rate.toString())}
                      </span>
                      <p>امتیاز از </p>
                      <p>&nbsp;</p>
                      <p>
                        {latinToPersian(this.state.movie.ratedUsers.toString())}
                      </p>
                      <p>&nbsp;</p>
                      <p> کاربر </p>
                    </div>

                    <div class="single-product-add-container">
                      <a href="#" className="single-product-add">
                        <span className="icon-add-to-card" />
                        <strong class="single-product-add-strong">
                          {latinToPersian(this.state.movie.price.toString()) +
                            " تومان"}
                        </strong>
                      </a>
                    </div>
                  </div>
                  <div class="movie-main-content-poster">
                    <img
                      style={posterStyle}
                      src={
                        MainUrl +
                        "/image.ashx?file=" +
                        this.state.movie.thumbnail.url
                      }
                      alt="movie name"
                    />
                  </div>
                </div>
              </div>

              <div className="single-product-dec">
                <div className="single-product-dec-header">
                  <ul>
                    <li className="current" id="tab-detail">
                      <a onClick={this.onMovieDetailClick.bind(this)}>
                        توضیحات سریال
                      </a>
                    </li>
                    <li className="" id="tab-comment">
                      <a onClick={this.onCommentClick.bind(this)}>
                        نظرات کاربران
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  {this.state.commentClicked && (
                    <MovieComment movieId={this.state.movie.id} />
                  )}
                  {this.state.movieDetailClicked && (
                    <MovieTeaser movie={this.state.movie} />
                  )}
                </div>
              </div>
              {this.state.relatedMovies != null ? (
                <TopMovies
                  movies={this.state.relatedMovies}
                  title="فیلم های مشابه"
                  id={1}
                />
              ) : null}
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

var Genre = React.createClass({
  render() {
    return (
      <div>
        <strong className="inline-class">ژانر : </strong>
        {this.props.genres.map((genre, l) => (
          <div className="inline-class" key={genre.id}>
            <Link
              className="inline-class"
              to={{ pathname: "/agent/" + genre.id }}
            >
              {genre.name}
            </Link>
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

var Actor = React.createClass({
  render() {
    return (
      <div>
        <strong className="inline-class">بازیگران : </strong>
        {this.props.actors.agents.map((actor, l) => (
          <div className="inline-class" key={actor.id}>
            <Link
              className="inline-class"
              to={{ pathname: "/agent/" + actor.id }}
            >
              {actor.name}
            </Link>
            {this.props.actors.agents.length - 1 != l ? (
              <p className="inline-class"> , </p>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
});

var Provider = React.createClass({
  render() {
    return (
      <div>
        <strong className="inline-class">تهیه کننده : </strong>
        {this.props.providers.agents.map((provider, l) => (
          <div className="inline-class" key={provider.id}>
            <Link
              className="inline-class"
              to={{ pathname: "/agent/" + provider.id }}
            >
              {provider.name}
            </Link>
            {this.props.providers.agents.length - 1 != l ? (
              <p className="inline-class"> , </p>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
});

var Researcher = React.createClass({
  render() {
    return (
      <div>
        <strong className="inline-class">محقق : </strong>
        {this.props.researchers.agents.map((researcher, l) => (
          <div className="inline-class" key={researcher.id}>
            <Link
              className="inline-class"
              to={{ pathname: "/agent/" + researcher.id }}
            >
              {researcher.name}
            </Link>
            {this.props.researchers.agents.length - 1 != l ? (
              <p className="inline-class"> , </p>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
});
