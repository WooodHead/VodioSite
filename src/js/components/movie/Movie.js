import React, { Component } from "react";
import MovieDetail from "./MovieDetail";
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
      relatedMovies: null
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
    $.ajax({
      type: "GET",
      url: MainUrl+"/movie.ashx?movieId=1",
      success: function(data, textStatus, request) {
        this.setState({ movie: data.data });
        this.setState({
          durationString: convertMillisecondToString(this.state.movie.duration)
        });
        $.ajax({
          type: "GET",
          url:
            MainUrl+"/related.ashx?movieId=" +
            this.state.movie.id,
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
      const videoStyle = { width: "100%", height: "400px",background:'red' };
      const posterStyle = { width: "100%" };
      return (
        <div>
          <div className="content-container max-width">
            <div className="content-inner">
              <div className="single-product-container">
                <div className="single-product-container-center">
                  <div class="col-xs-6">
                  </div>
                  <div className="col-xs-4">
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
                  <div className="col-xs-2">
                    <div>
                      <img
                        style={posterStyle}
                        src={
                          MainUrl+"/image.ashx?file=" +
                          this.state.movie.thumbnail.url
                        }
                        alt="movie name"
                      />
                    </div>
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
                    <MovieDetail movie={this.state.movie} />
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
