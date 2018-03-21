import React, { Component } from "react";
import Player from "./Player";
import MovieComment from "./MovieComment";
import { latinToPersian, convertSecondToString } from "../../util/util";
import TopMovies from "../topmovies/TopMovies";
import { Link } from "react-router-dom";
import { MainUrl } from "../../util/RequestHandler";
import { inject, observer } from "mobx-react";
import { ToastContainer, toast, style } from "react-toastify";
import hdImage from "../../../img/hd.svg";
import sdImage from "../../../img/sd.svg";
import teaserImage from "../../../img/teaser.svg";
import commentImage from "../../../img/Comment.svg";
import purchaseImage from "../../../img/Buy.svg";
import downloadImage from "../../../img/download.svg";
import Image720 from "../../../img/quality/720p.svg";
import Image1080 from "../../../img/quality/1080.svg";
import Image480 from "../../../img/quality/480.svg";
import Image360 from "../../../img/quality/360.svg";
import Loading from "../loading/Loading";
import DocumentMeta from 'react-document-meta';


@inject("session", "movieStore", "gaStore")
@observer
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      durationString: "",
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
      function () {
        toast.dismiss(this.state.toastId);
      }.bind(this),
      3000
    );
  }

  onMovieDetailClick() {
    this.props.gaStore.addEvent("Movie", "click", "teaserTab", this.props.match.params.id);
    this.props.movieStore.movieDetailClicked = true;
    this.props.movieStore.commentClicked = false;
    $("#tab-detail").addClass("current");
    $("#tab-comment").removeClass("current");
  }

  onCommentClick() {
    this.props.gaStore.addEvent("Movie", "click", "commentsTab", this.props.match.params.id);
    this.props.movieStore.movieDetailClicked = false;
    this.props.movieStore.commentClicked = true;
    $("#tab-detail").removeClass("current");
    $("#tab-comment").addClass("current");
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      if (this.props.movieStore.movieId != this.props.match.params.id) {
        this.props.movieStore.movieId = this.props.match.params.id;
        this.props.movieStore.fetchMovie();
      }
    }


  }
  componentWillUnmount() {
    document.title = "ودیو مرجع فیلم مستقل";
  }

  componentDidMount() {
    if (this.props.match.params.status) {
      if (this.props.match.params.status == "success") {
        this.notify(true);
      } else if (this.props.match.params.status == "fail") {
        this.notify(false);
      }
    }

    if (this.props.movieStore.movieId == -1) {
      this.props.movieStore.movieId = this.props.match.params.id;
      this.props.movieStore.fetchMovie();
    }

    $(document).ready(function () {
      $("#season-header-01-01").click(function () {
        $("#season-content-01-01").slideToggle("100");
      });
    });
    $(document).ready(function () {
      $("#season-header-01-02").click(function () {
        $("#season-content-01-02").slideToggle("100");
      });
    });
    $(document).ready(function () {
      $("#season-header-01-03").click(function () {
        $("#season-content-01-03").slideToggle("100");
      });
    });
  }

  play() {
    this.props.movieStore.movieDetailClicked = false;
    this.props.session.showPlayerFullscreen = true;
  }

  download() {
    $(".download-background").show();
  }

  purchase() {
    this.props.gaStore.addEvent("Movie", "click", "purchaseButton", this.props.match.params.id);
    this.props.session.history.push({
      pathname: "/invoice/" + this.props.movieStore.movie.id,
      state: { director: this.props.movieStore.director }
    });
  }
  makeUrl(category, genre) {
    var url = MainUrl + "/movielist.ashx";
    if (category || genre) {
      url = url + "?";
    }
    if (category) {
      url = url + "categoryId=" + category.id;
    }
    if (genre) {
      url = url + "genreId=" + genre.id;
    }
    return url;
  }

  onCategoryClicked(category, genre) {
    this.props.gaStore.addEvent("Movie", "click", "category", category.id);
    this.props.session.gaUrl = "/list/" + (category.id + 1) + "/0";
    this.props.session.history.push("/list/" + (category.id + 1) + "/0");
    this.props.session.offset = 0;
    var url = this.makeUrl(category, genre);
    this.props.session.listUrl = url;
    this.props.session.isInitiating = true;
    this.props.session.title = category.name;
    this.props.session.fetchList();
  }


  render() {
    if (this.props.movieStore.movie) {
      document.title = "ودیو - " + this.props.movieStore.movie.title;
      this.props.gaStore.addPageView("/movie/" + this.props.movieStore.movie.id);
      $("#tab-detail").removeClass("current");
      $("#tab-comment").removeClass("current");
      var width = Math.round($(".movie-main-content-poster").width());
      var height = Math.round(width * 16 / 11);
      const videoStyle = { width: "100%", height: "400px", background: "red" };
      const hdStyle = { width: "100%" };

      const meta = {
        meta: {
          property: {
            'og:title': this.props.movieStore.movie.title,
            'og:type': 'website',
            'og:image':
              MainUrl +
              "/image.ashx?file=" +
              this.props.movieStore.movie.thumbnail.url +
              "&width=" +
              width +
              "&height=" +
              height
            ,
            'og:site_name': 'Vodio - ودیو',
            'og:url': "http://vodio.ir/movie/" + this.props.movieStore.movie.id
          }
        }
      };

      return (
        <div>
          <DocumentMeta {...meta} />

          <div id="movie-container" className="content-container max-width">
            <div className="content-inner">
              <div className="single-product-container" style={{
                background: '#1c1c1c'
              }}>
                <div className="single-product-container-center" style={{
                  zIndex: "2", position: "relative",
                  background: '#1c1c1c'
                }}>
                  <div class="movie-main-content-poster">
                    <img
                      class="movie-main-content-image"
                      src={
                        MainUrl +
                        "/image.ashx?file=" +
                        this.props.movieStore.movie.thumbnail.url +
                        "&width=" +
                        width +
                        "&height=" +
                        height
                      }
                      alt={this.props.movieStore.movie.title}
                    />
                  </div>
                  <div class="movie-main-content-info">
                    <h1 className="single-product-title">
                      {this.props.movieStore.movie.isHd ? <img class="hd-image" src={hdImage} alt="hd" /> : <img class="hd-image" src={sdImage} alt="sd" />}
                      <span style={{ marginRight: "10px" }}>
                        {latinToPersian(this.props.movieStore.movie.title)}
                      </span>
                    </h1>
                    <div className="single-product-header-meta">
                      <div style={{
                        fontSize: '12px',
                        color: 'white',
                        width: 'fit-content',
                        float: 'right',
                        marginTop: '10px'
                      }}>
                        {latinToPersian(this.props.movieStore.durationString)}{" "}
                      </div>
                      {this.props.movieStore.movie.categories.map(
                        category => (
                          <div
                            className="single-product-category"
                            key={category.id}
                          >
                            <a
                              class="category-item"
                              onClick={this.onCategoryClicked.bind(
                                this,
                                category,
                                null
                              )}
                            >
                              {category.name}
                            </a>
                          </div>
                        )
                      )}
                    </div>
                    {this.props.movieStore.movie.editorialRate != 0 && (
                      <div className="single-product-score">
                        <span>
                          {latinToPersian(
                            this.props.movieStore.movie.editorialRate.toString()
                          )}
                        </span>
                        {/* <p>امتیاز از </p>
                      <p>&nbsp;</p>
                      <p>
                        {latinToPersian(this.state.movie.ratedUsers.toString())}
                      </p>
                      <p>&nbsp;</p>
                      <p> کاربر </p> */}
                        <p>امتیاز ودیو</p>
                      </div>
                    )}
                    <div class="button-container">
                      {this.props.session.session != null &&
                        this.props.movieStore.movie.bought == true ? (
                          <div style={{ width: "160px" }}>
                            <a
                              onClick={this.play.bind(this)}
                              className="purchase-button-container"
                            >
                              <img
                                src={purchaseImage}
                                style={{
                                  width: "20px",
                                  marginRight: "15px",
                                  height: "45px"
                                }}
                              />
                              <strong class="single-product-add-strong">
                                نمایش
                            </strong>
                            </a>
                            {this.props.movieStore.movieId != null && this.props.movieStore.movie.downloadQualities != null && (
                              <a
                                onClick={this.download.bind(this)}
                                className="download-button-container"
                              >
                                <img
                                  src={downloadImage}
                                  style={{
                                    width: "20px",
                                    marginRight: "15px",
                                    height: "45px"
                                  }}
                                />
                                <strong class="single-product-add-strong">
                                  دانلود
                              </strong>
                              </a>
                            )}
                            {this.props.movieStore.movie.downloadQualities ? (
                              <Download
                                qualities={
                                  this.props.movieStore.movie.downloadQualities
                                }
                              />
                            ) : null}
                          </div>
                        ) : (
                          <a
                            onClick={this.purchase.bind(this)}
                            className="single-product-add"
                          >
                            <img
                              src={purchaseImage}
                              style={{
                                width: "20px",
                                marginRight: "15px",
                                height: "45px"
                              }}
                            />
                            <strong class="single-product-add-strong">
                              {latinToPersian(
                                this.props.movieStore.movie.price.toString()
                              ) + " تومان"}
                            </strong>
                          </a>
                        )}

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
                      {this.props.movieStore.movie.genres != null ? (
                        <Genre genres={this.props.movieStore.movie.genres} />
                      ) : null}

                      {this.props.movieStore.director != null ? (
                        <Director directors={this.props.movieStore.director} />
                      ) : null}

                      {this.props.movieStore.actors != null ? (
                        <Actor actors={this.props.movieStore.actors} />
                      ) : null}
                      {this.props.movieStore.provider != null ? (
                        <Provider providers={this.props.movieStore.provider} />
                      ) : null}
                      {this.props.movieStore.composers != null ? (
                        <Composer composers={this.props.movieStore.composers} />
                      ) : null}
                      {this.props.movieStore.editors != null ? (
                        <Editor editors={this.props.movieStore.editors} />
                      ) : null}
                      {this.props.movieStore.writers != null ? (
                        <Writer writers={this.props.movieStore.writers} />
                      ) : null}
                      {this.props.movieStore.composers != null ? (
                        <Composer composers={this.props.movieStore.composers} />
                      ) : null}
                      {this.props.movieStore.animators != null ? (
                        <Animator animators={this.props.movieStore.animators} />
                      ) : null}

                      {this.props.movieStore.researcher != null ? (
                        <Researcher
                          researchers={this.props.movieStore.researcher}
                        />
                      ) : null}
                    </div>

                    <div class="movie-main-content-story-line">
                      <div>
                        <strong style={{ color: "wheat", fontSize: "18px" }}>
                          خلاصه داستان:
                        </strong>
                        <p
                          style={{
                            textAlign: "justify",
                            textJustify: "inter-word",
                            color: "white"
                          }}
                        >
                          {this.props.movieStore.movie.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="single-product-dec">
                <div className="single-product-dec-header">
                  <ul>
                    <li id="tab-detail">
                      <a
                        style={{ display: "inline-block" }}
                        onClick={this.onMovieDetailClick.bind(this)}
                      >
                        <div style={{ color: 'white' }}>
                          تیزر
                        </div>
                      </a>
                    </li>
                    <li>
                      <div
                        style={{
                          width: '1px',
                          background: 'white',
                          height: '25px',
                          position: 'relative',
                          marginLeft: '20px'
                        }}
                      />
                    </li>
                    <li className="" id="tab-comment">
                      <a
                        style={{ display: "inline-block" }}
                        onClick={this.onCommentClick.bind(this)}
                      >
                        <div style={{ color: 'white' }}>
                          نظرات کاربران
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div style={{ direction: "rtl" }}>
                  {this.props.movieStore.commentClicked && (
                    <MovieComment movieId={this.props.movieStore.movie.id} />
                  )}
                  {this.props.movieStore.movieDetailClicked && (
                    <Player
                      movie={this.props.movieStore.movie}
                      isTrailer={true}
                    />
                  )}
                </div>
              </div>
              {this.props.movieStore.relatedMovies != null ? (
                <TopMovies
                  analyticsValue={this.props.movieStore.movie.id}
                  analyticsLabel="relatedBar"
                  analyticsAction="click"
                  analyticsCategory="Movie"
                  movies={this.props.movieStore.relatedMovies}
                  title="فیلم های مشابه"
                  id={1}
                />
              ) : null}
            </div>
          </div>
          {this.props.movieStore.showLoading && <Loading />}

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
      <div class="movie-main-content-detail-lineheight">
        <strong className="inline-class">ژانر : </strong>
        {this.props.genres.map((genre, l) => (
          <div className="inline-class" key={genre.id}>
            <Link
              className="inline-class r-disable"
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
      <div class="movie-main-content-detail-lineheight">
        <strong className="inline-class">کارگردان : </strong>
        {this.props.directors.agents.map((director, l) => (
          <div className="inline-class" key={director.id}>
            <Link
              className="inline-class r-disable"
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

var Writer = React.createClass({
  render() {
    return (
      <div class="movie-main-content-detail-lineheight">
        <strong className="inline-class">نویسنده : </strong>
        {this.props.writers.agents.map((actor, l) => (
          <div className="inline-class" key={actor.id}>
            <Link
              className="inline-class r-disable"
              to={{ pathname: "/agent/" + actor.id }}
            >
              {actor.name}
            </Link>
            {this.props.writers.agents.length - 1 != l ? (
              <p className="inline-class"> , </p>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
});

var Editor = React.createClass({
  render() {
    return (
      <div class="movie-main-content-detail-lineheight">
        <strong className="inline-class">تدوین : </strong>
        {this.props.editors.agents.map((actor, l) => (
          <div className="inline-class" key={actor.id}>
            <Link
              className="inline-class r-disable"
              to={{ pathname: "/agent/" + actor.id }}
            >
              {actor.name}
            </Link>
            {this.props.editors.agents.length - 1 != l ? (
              <p className="inline-class"> , </p>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
});


var Cameraman = React.createClass({
  render() {
    return (
      <div class="movie-main-content-detail-lineheight">
        <strong className="inline-class">فیلم‌بردار : </strong>
        {this.props.cameramans.agents.map((actor, l) => (
          <div className="inline-class" key={actor.id}>
            <Link
              className="inline-class r-disable"
              to={{ pathname: "/agent/" + actor.id }}
            >
              {actor.name}
            </Link>
            {this.props.cameramans.agents.length - 1 != l ? (
              <p className="inline-class"> , </p>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
});

var Composer = React.createClass({
  render() {
    return (
      <div class="movie-main-content-detail-lineheight">
        <strong className="inline-class">آهنگساز : </strong>
        {this.props.composers.agents.map((actor, l) => (
          <div className="inline-class" key={actor.id}>
            <Link
              className="inline-class r-disable"
              to={{ pathname: "/agent/" + actor.id }}
            >
              {actor.name}
            </Link>
            {this.props.composers.agents.length - 1 != l ? (
              <p className="inline-class"> , </p>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
});

var Animator = React.createClass({
  render() {
    return (
      <div class="movie-main-content-detail-lineheight">
        <strong className="inline-class">انیماتور : </strong>
        {this.props.animators.agents.map((actor, l) => (
          <div className="inline-class" key={actor.id}>
            <Link
              className="inline-class r-disable"
              to={{ pathname: "/agent/" + actor.id }}
            >
              {actor.name}
            </Link>
            {this.props.animators.agents.length - 1 != l ? (
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
      <div class="movie-main-content-detail-lineheight">
        <strong className="inline-class">بازیگران : </strong>
        {this.props.actors.agents.map((actor, l) => (
          <div className="inline-class" key={actor.id}>
            <Link
              className="inline-class r-disable"
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
      <div class="movie-main-content-detail-lineheight">
        <strong className="inline-class">تهیه کننده : </strong>
        {this.props.providers.agents.map((provider, l) => (
          <div className="inline-class" key={provider.id}>
            <Link
              className="inline-class r-disable"
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
      <div class="movie-main-content-detail-lineheight">
        <strong className="inline-class">محقق : </strong>
        {this.props.researchers.agents.map((researcher, l) => (
          <div className="inline-class" key={researcher.id}>
            <Link
              className="inline-class r-disable"
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

@inject("session", "movieStore")
@observer
class Download extends React.Component {
  closeDownload() {
    $(".download-background").hide();
  }

  componentDidMount() {
    var height = 60;
    var qualities = this.props.qualities.split(",");
    qualities.forEach(element => {
      switch (element) {
        case "360":
          height += 55;
          break;
        case "720":
          height += 55;
          break;
        case "1080":
          height += 55;
          break;
        case "480":
          height += 55;
          break;

        default:
          break;
      }
    });
    $("#download-panel").css("top", "calc(50% - " + height / 2 + "px");
  }

  render() {
    var qualities = this.props.qualities.split(",");
    var q480 = false;
    var q1080 = false;
    var q720 = false;
    var q360 = false;
    qualities.forEach(element => {
      switch (element) {
        case "500":
          q360 = true;
          break;
        case "900":
          q480 = true;
          break;
        case "1500":
          q720 = true;
          break;
        case "2200":
          q1080 = true;
          break;
        default:
          break;
      }
    });
    return (
      <div class="download-background" onClick={this.closeDownload}>
        <div class="download-panel" id="download-panel">
          <div
            style={{
              textAlign: "center",
              height: "30px",
              color: "#7d1d65"
            }}
          >
            کیفیت مورد نظر خود را انتخاب کنید :
          </div>
          {q1080 && (
            <a
              className="download-button-container-item"
              href={
                MainUrl +
                "/DownloadTokenHandler.ashx?q=2200&token=" +
                this.props.session.session +
                "&movieId=" +
                this.props.movieStore.movieId
              }
              target="_blank"
            >
              <img
                src={Image1080}
                style={{
                  width: "30px",
                  marginRight: "15px",
                  height: "45px"
                }}
              />
              <strong class="single-product-add-strong">
                {latinToPersian("1080p")}
              </strong>
            </a>
          )}
          {q720 && (
            <a
              className="download-button-container-item"
              href={
                MainUrl +
                "/DownloadTokenHandler.ashx?q=1500&token=" +
                this.props.session.session +
                "&movieId=" +
                this.props.movieStore.movieId
              }
              target="_blank"
            >
              <img
                src={Image720}
                style={{
                  width: "30px",
                  marginRight: "15px",
                  height: "45px"
                }}
              />
              <strong class="single-product-add-strong">
                {latinToPersian("720p")}
              </strong>
            </a>
          )}
          {q480 && (
            <a
              className="download-button-container-item"
              href={
                MainUrl +
                "/DownloadTokenHandler.ashx?q=900&token=" +
                this.props.session.session +
                "&movieId=" +
                this.props.movieStore.movieId
              }
              target="_blank"
            >
              <img
                src={Image480}
                style={{
                  width: "30px",
                  marginRight: "15px",
                  height: "45px"
                }}
              />
              <strong class="single-product-add-strong">
                {latinToPersian("480p")}
              </strong>
            </a>
          )}
          {q360 && (
            <a
              className="download-button-container-item"
              href={
                MainUrl +
                "/DownloadTokenHandler.ashx?q=500&token=" +
                this.props.session.session +
                "&movieId=" +
                this.props.movieStore.movieId
              }
              target="_blank"
            >
              <img
                src={Image360}
                style={{
                  width: "30px",
                  marginRight: "15px",
                  height: "45px"
                }}
              />
              <strong class="single-product-add-strong">
                {latinToPersian("360p")}
              </strong>
            </a>
          )}
        </div>
      </div>
    );
  }
}
