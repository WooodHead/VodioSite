import React, { Component } from "react";
import MovieTeaser from "./MovieTeaser";
import MovieComment from "./MovieComment";
import { latinToPersian, convertMillisecondToString } from "../../util/util";
import TopMovies from "../topmovies/TopMovies";
import { Link } from "react-router-dom";
import { MainUrl } from "../../util/RequestHandler";
import { inject, observer } from "mobx-react";
import { ToastContainer, toast, style } from "react-toastify";
import hdImage from "../../../img/hd.svg";
import teaserImage from "../../../img/teaser.svg";
import commentImage from "../../../img/Comment.svg";
import purchaseImage from "../../../img/Buy.svg";

@inject("session")
@observer
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
      loadPage: false,
      toastId: null
    };
  }

  notify(success) {
    if (success == true) {
      var id = toast.success("خرید شما با موفقیت انجام شد", {
        position: toast.POSITION.TOP_RIGHT,
        closeButton: false,
        className: {
          textAlign: "center",
          fontSize: "11px",
          right: "0em",
          top: "0em"
        },
        autoClose: 3000
      });
      this.setState({ toastId: id });
    } else {
      var id = toast.error("خرید شما با مشکل مواجه شد. لطفا دوباره تلاش کنید", {
        position: toast.POSITION.TOP_RIGHT,
        closeButton: false,
        className: {
          textAlign: "center",
          fontSize: "11px",
          right: "0em",
          top: "0em"
        },
        autoClose: 3000
      });
      this.setState({ toastId: id });
    }
    setTimeout(
      function() {
        toast.dismiss(this.state.toastId);
      }.bind(this),
      3000
    );
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
    if (this.props.match.params.status) {
      if (this.props.match.params.status == "success") {
        this.notify(true);
      } else if (this.props.match.params.status == "fail") {
        this.notify(false);
      }
    }
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

  purchase() {
    if (
      this.props.session.session != null &&
      this.props.session.session != ""
    ) {
      this.props.session.showLoading = true;
      var url =
        MainUrl +
        "/NextpayPurchaseHandler.ashx?movieId=" +
        this.state.movie.id +
        "&token=" +
        this.props.session.session;
      window.location.replace(url);
      // $.ajax({
      //   type: "GET",
      //   headers: {
      //     token: this.props.session.session
      //   },
      //   url:
      //     MainUrl +
      //     "/NextpayPurchaseHandler.ashx?movieId=" +
      //     this.state.movie.id,
      //   success: function(data, textStatus, jQxhr) {
      //     this.notify();
      //     setTimeout(function() {
      //       toast.dismiss(this.state.toastId);
      //     }.bind(this), 3000);
      //     this.props.session.showLoading = false;
      //   }.bind(this),
      //   error: function(jqXhr, textStatus, errorThrown) {
      //     this.notify();
      //     setTimeout(function() {
      //       toast.dismiss(this.state.toastId);
      //     }.bind(this), 3000);
      //     this.props.session.showLoading = false;
      //   }
      // });
    } else {
      this.props.session.showLogin = true;
      this.props.session.movieIdForPurchase = this.state.movie.id;
    }
  }

  render() {
    if (this.state.movie) {
      const videoStyle = { width: "100%", height: "400px", background: "red" };
      const posterStyle = { width: "80%" };
      const hdStyle = { width: "100%" };
      return (
        <div>
          <div className="content-container max-width">
            <div className="content-inner">
              <div className="single-product-container">
                <div className="single-product-container-center">
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
                  <div class="movie-main-content-info">
                    <h1 className="single-product-title">
                      <img class="hd-image" src={hdImage} alt="hd" />
                      <span style={{ paddingRight: "10px" }}>
                        {this.state.movie.title}
                      </span>
                    </h1>
                    <div className="single-product-header-meta">
                      <span style={{ fontSize: "12px" }}>
                        {latinToPersian(this.state.durationString)}{" "}
                      </span>
                      <span style={{ display: "inline-flex" }}>
                        {this.state.movie.categories.map(category => (
                          <p
                            className="single-product-category"
                            key={category.id}
                          >
                            <Link
                              to={{
                                pathname: "/List",
                                query: { name: category.name }
                              }}
                            >
                              {category.name}
                            </Link>
                          </p>
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
                      <a
                        onClick={this.purchase.bind(this)}
                        className="single-product-add"
                      >
                        <img
                          src={purchaseImage}
                          style={{
                            width: "20px",
                            marginLeft: "15px",
                            marginRight: "15px"
                          }}
                        />
                        <strong class="single-product-add-strong">
                          {latinToPersian(this.state.movie.price.toString()) +
                            " تومان"}
                        </strong>
                      </a>
                      {!this.state.closeNotify && (
                        <ToastContainer
                          toastClassName={{
                            font: " 500 .8em/40px 'IRSans',Sans-serif"
                          }}
                          autoClose={1}
                        />
                      )}
                    </div>
                  </div>
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
                    </div>
                  </div>
                  <div class="movie-main-content-story-line">
                    <div>
                      <strong style={{ color: "#7d1d65" }}>
                        خلاصه داستان:
                      </strong>
                      <p
                        style={{
                          textAlign: "justify",
                          textJustify: "inter-word"
                        }}
                      >
                        {this.state.movie.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-product-dec">
                <div className="single-product-dec-header">
                  <ul>
                    <li className="current" id="tab-detail">
                      <a
                        style={{ display: "inline-block" }}
                        onClick={this.onMovieDetailClick.bind(this)}
                      >
                        <img
                          src={teaserImage}
                          style={{
                            width: "20px",
                            marginLeft: "5px"
                          }}
                        />
                        تیزر
                      </a>
                    </li>
                    <li>
                      <div
                        style={{
                          width: "1px",
                          top: "15%",
                          background: "black",
                          height: "70%",
                          position: "relative"
                        }}
                      />
                    </li>
                    <li className="" id="tab-comment">
                      <a
                        style={{ display: "inline-block" }}
                        onClick={this.onCommentClick.bind(this)}
                      >
                        <img
                          src={commentImage}
                          style={{
                            width: "20px",
                            marginLeft: "5px"
                          }}
                        />
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
