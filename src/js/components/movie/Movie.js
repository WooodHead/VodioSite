import React from "react";
import MovieDetail from "./MovieDetail";
import MovieComment from "./MovieComment";
import { latinToPersian } from "../../util/util";
import Side from "../widget/side";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    console.log(id);
    this.state = {
      movie: null,
      movieId: id,
      durationString: "",
      movieDetailClicked: true,
      commentClicked: false
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

  convertMillisecondToString(millisecond) {
    var hour = parseInt(millisecond / 1000 / 3600);
    var minute = parseInt((millisecond / 1000 - hour * 3600) / 60);
    if (hour != 0) {
      return hour + " ساعت و " + minute + " دقیقه";
    } else {
      return minute + " دقیقه";
    }
  }

  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "http://localhost:58583/movie.ashx?movieId=1",
      success: function(data, textStatus, request) {
        this.setState({ movie: data });
        this.setState({
          durationString: this.convertMillisecondToString(
            this.state.movie.data.duration
          )
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
      return (
        <div>
          <div className="single-pages-header-border">
            <div className="max-width">
              <div className="single-pages-header-border-left" />
            </div>
          </div>
          <div className="content-container max-width">
            <div className="content-inner">
              <div className="single-product-container">
                <div className="single-product-container-center">
                  <div className="single-product-right">
                    <div className="single-product-right-img">
                      <img
                        src={this.state.movie.data.thumbnail.url}
                        alt="movie name"
                      />
                      <div className="single-product-right-img-top-layer-meta" />
                    </div>
                  </div>
                  <div className="single-product-left">
                    <h1 className="single-product-title">
                      {this.state.movie.data.title}
                    </h1>
                    <div className="single-product-header-meta">
                      <span>{latinToPersian(this.state.durationString)}</span>
                      <span>
                        {this.state.movie.data.categories.map(category => (
                          <span
                            className="single-product-category"
                            key={category.id}
                          >
                            {category.name}
                          </span>
                        ))}
                      </span>
                    </div>
                    <div className="single-product-score">
                      <span>
                        {latinToPersian(this.state.movie.data.rate.toString())}
                      </span>
                      <p>امتیاز از </p>
                      <p>&nbsp;</p>
                      <p>
                        {latinToPersian(
                          this.state.movie.data.ratedUsers.toString()
                        )}
                      </p>
                      <p>&nbsp;</p>
                      <p> کاربر </p>
                    </div>
                    <div className="single-product-order-options">
                      <strong>
                        لطفا کیفیت های مورد نظر خود را انتخاب کنید!
                      </strong>
                      <form>
                        <p>
                          <input id="checkbox-01" type="checkbox" />{" "}
                          <label htmlFor="checkbox-01">
                            کیفیت ۱۰۸۰p Blu-ray <span>۲,۰۰۰ تومان</span>
                          </label>
                        </p>
                        <p>
                          <input id="checkbox-02" type="checkbox" />{" "}
                          <label htmlFor="checkbox-02">
                            کیفیت ۷۲۰p Blu-ray <span>۱,۵۰۰ تومان</span>
                          </label>
                        </p>
                        <p>
                          <input id="checkbox-02" type="checkbox" />{" "}
                          <label htmlFor="checkbox-02">
                            {" "}
                            خرید تمامی کیفیت ها <span>۳,۰۰۰ تومان</span>
                          </label>
                        </p>
                      </form>
                    </div>
                    <a href="#" className="single-product-add">
                      <span className="icon-add-to-card" />
                      <strong>افزودن به سبد خرید</strong>
                    </a>
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
                  {this.state.commentClicked && <MovieComment />}
                  {this.state.movieDetailClicked && (
                    <MovieDetail movie={this.state.movie.data} />
                  )}
                </div>
              </div>
              <div className="single-product-moviez-popular">
                <div className="single-product-moviez-popular-header">
                  <span className="icon-video spacail-products-icon" />
                  <strong className="spacail-products-title">
                    محصولات مشابه
                  </strong>
                  <div className="spacail-products-control">
                    <a id="prev3" className="prev" href="#">
                      <span className="icon-angle-left" />
                    </a>{" "}
                    <a id="next3" className="next" href="#">
                      <span className="icon-angle-right" />
                    </a>
                  </div>
                </div>
                <div className="single-product-moviez-popular-inner">
                  <div className="single-product-movie-popular">
                    <div className="single-product-movie-popular-inner spmp-left">
                      <a href="#" className="spi-movie-dvd-cover">
                        <img src="images/top-movez-03.jpg" alt="movie name" />><div className="spi-movie-dvd-cover-top-layer" />
                      </a>
                      <h3 className="spacail-product-title">
                        <a href="#">خرید قسمت ۱ فصل دوم شهرزاد</a>
                      </h3>
                      <div className="spacail-product-meta">
                        <span>
                          <a href="#">۱۳۹۶</a>
                        </span>{" "}
                        - <span>۱۲۰ دقیقه</span> -{" "}
                        <span className="green">
                          <a href="#">۱۰۸۰p</a>
                        </span>
                      </div>
                      <p className="spacail-product-price">
                        <span className="price-value">۲۹,۰۰۰ تومان</span>
                      </p>
                      <a href="#" className="spacail-product-add">
                        افزودن به سبد خرید
                      </a>
                    </div>
                  </div>
                  <div className="single-product-movie-popular">
                    <div className="single-product-movie-popular-inner spmp-center">
                      <a href="#" className="spi-movie-dvd-cover">
                        <img src="images/top-movez-05.jpg" alt="movie name" />
                        <div className="spi-movie-dvd-cover-top-layer" />
                      </a>
                      <h3 className="spacail-product-title">
                        <a href="#">خرید فیلم گشت ۲</a>
                      </h3>
                      <div className="spacail-product-meta">
                        <span>
                          <a href="#">۱۳۹۶</a>
                        </span>{" "}
                        - <span>۱۲۰ دقیقه</span> -{" "}
                        <span className="green">
                          <a href="#">۱۰۸۰p</a>
                        </span>
                      </div>
                      <p className="spacail-product-price">
                        <span className="price-value">۲۹,۰۰۰ تومان</span>
                      </p>
                      <a href="#" className="spacail-product-add">
                        افزودن به سبد خرید
                      </a>
                    </div>
                  </div>
                  <div className="single-product-movie-popular">
                    <div className="single-product-movie-popular-inner spmp-right">
                      <a href="#" className="spi-movie-dvd-cover">
                        <img src="images/top-movez-08.jpg" alt="movie name" />
                        <div className="spi-movie-dvd-cover-top-layer-meta" />
                      </a>
                      <h3 className="spacail-product-title">
                        <a href="#">خرید سریال آسپرین فصل دوم</a>
                      </h3>
                      <div className="spacail-product-meta">
                        <span>
                          <a href="#">۱۳۹۶</a>
                        </span>{" "}
                        - <span>۱۲۰ دقیقه</span> -{" "}
                        <span className="green">
                          <a href="#">۱۰۸۰p</a>
                        </span>
                      </div>
                      <p className="spacail-product-price">
                        <span className="price-value">۲۹,۰۰۰ تومان</span>
                      </p>
                      <a href="#" className="spacail-product-add">
                        افزودن به سبد خرید
                      </a>
                    </div>
                  </div>
                  <div className="single-product-movie-popular">
                    <div className="single-product-movie-popular-inner spmp-left">
                      <a href="#" className="spi-movie-dvd-cover">
                        <img src="images/top-movez-03.jpg" alt="movie name" />
                        <div className="spi-movie-dvd-cover-top-layer" />
                      </a>
                      <h3 className="spacail-product-title">
                        <a href="#">خرید قسمت ۱ فصل دوم شهرزاد</a>
                      </h3>
                      <div className="spacail-product-meta">
                        <span>
                          <a href="#">۱۳۹۶</a>
                        </span>{" "}
                        - <span>۱۲۰ دقیقه</span> -{" "}
                        <span className="green">
                          <a href="#">۱۰۸۰p</a>
                        </span>
                      </div>
                      <p className="spacail-product-price">
                        <span className="price-value">۲۹,۰۰۰ تومان</span>
                      </p>
                      <a href="#" className="spacail-product-add">
                        افزودن به سبد خرید
                      </a>
                    </div>
                  </div>
                  <div className="single-product-movie-popular">
                    <div className="single-product-movie-popular-inner spmp-center">
                      <a href="#" className="spi-music-cover">
                        <img src="images/music-cover-05.jpg" alt="movie name" />
                        <div className="spi-music-cover-top-layer" />
                      </a>
                      <h3 className="spacail-product-title">
                        <a href="#">خرید آلبوم جدید علی لهراسبی</a>
                      </h3>
                      <div className="spacail-product-meta">
                        <span>۱۲ تراکت</span> -{" "}
                        <span className="green">
                          <a href="#">۳۲۰</a>
                        </span>
                      </div>
                      <p className="spacail-product-price">
                        <span className="price-value">۷,۰۰۰ تومان</span>
                      </p>
                      <a href="#" className="spacail-product-add">
                        افزودن به سبد خرید
                      </a>
                    </div>
                  </div>
                  <div className="single-product-movie-popular">
                    <div className="single-product-movie-popular-inner spmp-right">
                      <a href="#" className="spi-movie-dvd-cover">
                        <img src="images/top-movez-08.jpg" alt="movie name" />
                        <div className="spi-movie-dvd-cover-top-layer-meta" />
                      </a>
                      <h3 className="spacail-product-title">
                        <a href="#">خرید سریال آسپرین فصل دوم</a>
                      </h3>
                      <div className="spacail-product-meta">
                        <span>
                          <a href="#">۱۳۹۶</a>
                        </span>{" "}
                        - <span>۱۲۰ دقیقه</span> -{" "}
                        <span className="green">
                          <a href="#">۱۰۸۰p</a>
                        </span>
                      </div>
                      <p className="spacail-product-price">
                        <span className="price-value">۲۹,۰۰۰ تومان</span>
                      </p>
                      <a href="#" className="spacail-product-add">
                        افزودن به سبد خرید
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <Side/>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
