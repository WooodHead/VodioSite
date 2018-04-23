import React from "react";
import "../../../css/infinite.css";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { MainUrl, MediaUrl } from "../../util/RequestHandler";
import "jquery-visible";
import clboard from '../../../img/clapperboard.png'

@inject("session", "search")
@observer
export default class SearchList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.session.showFooter = false;
    window.onscroll = function () {
      if (
        this.props.search.aElements != null &&
        this.props.search.aElements.length != this.props.search.aCount &&
        $("#" + this.props.search.aLastElementId).visible() &&
        this.props.search.isLoading == false
      ) {
        console.log(this.props.search.aCount + " " + this.props.search.aElements.length)
        this.props.search.fetchANextSearchList();
      }
    }.bind(this);
    if (this.props.search.keyword == null) {
      this.props.search.filter = "فیلم"
      this.props.search.fetchASearchList(this.props.match.params.keyword);
    }
    $("body").css("background", "#eeeeee");
  }

  componentWillUnmount() {
    $("body").css("background", "white");
    this.props.session.showFooter = true;
  }

  movieClicked(movieId) {
    this.props.movieStore.movieId = movieId;
    this.props.movieStore.fetchMovie();
  }

  filterClicked(e, filter) {
    var elems = Array.prototype.slice.call(document.getElementsByClassName("search-filter"))
    elems.forEach(element => {
      element.classList.remove("search-filter-active")
    });
    e.currentTarget.classList.add("search-filter-active")
    this.props.search.filter = filter;
    this.props.search.fetchASearchList(this.props.match.params.keyword);
  }

  render() {
    var childElements = null;
    if (this.props.search.aElements != null) {
      childElements = this.props.search.aElements.map(
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
                        MediaUrl +
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
          }}>نتایج جستجو / </div>
          <div style={{
            fontSize: '13px',
            fontFamily: 'irsansbold',
            color: '#eb0089',
            marginRight: '10px',
            marginLeft: '5px',
            float: 'right',
            marginTop: '5px'
          }}>{this.props.match.params.keyword}</div>
          <div onClick={(e) => this.filterClicked(e, "فیلم")} class="search-filter search-filter-active">فیلم</div>
          <div onClick={(e) => this.filterClicked(e, "کارگردان")} class="search-filter">کارگردان</div>
          <div onClick={(e) => this.filterClicked(e, "بازیگر")} class="search-filter">بازیگر</div>
          <div onClick={(e) => this.filterClicked(e, "آهنگ‌ساز")} class="search-filter">آهنگ‌ساز</div>
          <div onClick={(e) => this.filterClicked(e, "انیماتور")} class="search-filter">انیماتور</div>
          <div onClick={(e) => this.filterClicked(e, "تدوین")} class="search-filter">تدوین</div>
          <div onClick={(e) => this.filterClicked(e, "تهیه کننده")} class="search-filter">تهیه کننده</div>
          <div onClick={(e) => this.filterClicked(e, "صدابردار")} class="search-filter">صدابردار</div>
          <div onClick={(e) => this.filterClicked(e, "فیلم‌بردار")} class="search-filter">فیلم‌بردار</div>
          <div onClick={(e) => this.filterClicked(e, "نویسنده")} class="search-filter">نویسنده</div>
        </div>

        <div class="list-content-header">
          {this.props.search.aElements != null && childElements}
          {this.props.search.aCount == 0 && (
            <div style={{ width: "100%", textAlign: "center" }}>
              نتیجه ای یافت نشد.
            </div>
          )}
          {this.props.search.isLoading && (
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
