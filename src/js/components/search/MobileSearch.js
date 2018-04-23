import React from "react";
import { MainUrl, MediaUrl } from "../../util/RequestHandler";
import { inject, observer } from "mobx-react";
import search from "../../../img/search.svg";
import { Link } from "react-router-dom";

@inject("session", "search", "movieStore", "gaStore")
@observer
export default class MobileSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResult: null, searchInputValue: "" };
  }

  componentDidMount() {
    $(window).click(
      function () {
        this.setState({ searchResult: null, searchInputValue: "" });
      }.bind(this)
    );

    $("#MobileSearchInput").click(function (event) {
      event.stopPropagation();
    });
  }

  onClick() {
    $("#MobileSearchInput").focus();
    this.search();
  }

  searchFunction(e) {
    this.setState({ searchInputValue: e.target.value });
    if (e.target.value.length > 2) {
      $.ajax({
        type: "GET",
        url: MainUrl + "/search.ashx?keyword=" + e.target.value,
        success: function (data, textStatus, request) {
          this.setState({ searchResult: data.data });
        }.bind(this),
        error: function (request, textStatus, errorThrown) { }
      });
    } else {
      this.setState({ searchResult: null });
    }
  }

  search() {
    if (this.state.searchInputValue != "") {
      this.props.gaStore.addEvent("Search", "search", this.state.searchInputValue.toString());
      this.props.search.filter = "فیلم"
      this.props.search.fetchASearchList(this.state.searchInputValue);
      this.props.session.history.push("/search/" + this.state.searchInputValue);
      this.setState({ searchResult: null, searchInputValue: "" });
    } else {
      $(".mobile-search").addClass("no-input-shake");
      setTimeout(function () {
        $(".mobile-search").removeClass("no-input-shake");
      }, 500);
    }
  }

  movieClicked(movieId) {
    this.props.gaStore.addEvent("Search", "search", this.state.searchInputValue.toString());
    this.props.gaStore.addEvent("Search", "MovieItem", movieId.toString());
    this.props.movieStore.movieId = movieId;
    this.props.movieStore.fetchMovie();
    this.props.session.history.push("/movie/" + movieId);
  }

  render() {
    var width = Math.floor($(".mobile-search-result").width() * 0.3);
    var height = Math.floor(width * 16 / 11);
    return (
      <div class="mobile-search">
        <div
          style={{
            width: "calc(100% - 10px)",
            display: "inline-flex",
            height: "35px",
            marginRight: "5px",
            marginLeft: "5px",
            direction: "rtl"
          }}
        >
          <input
            id="MobileSearchInput"
            placeholder="جستجو ..."
            value=""
            onChange={this.searchFunction.bind(this)}
            value={this.state.searchInputValue}
            style={{
              width: "calc(100% - 40px)",
              borderRadius: "17.5px",
              paddingRight: "10px",
              border: "1px solid rgba(0,0,0,0.1)",
              fontSize: "12px",
              fontFamily: "IRSans",
              background: "#f0f0f0",
              color: "#eb0089",
              direction: "rtl"
            }}
          />
          <img
            style={{
              width: "35px",
              height: "35px",
              top: "0px",
              left: "0px",
              float: "left"
            }}
            src={search}
            onClick={this.onClick.bind(this)}
          />
        </div>

        {this.state.searchResult != null ? (
          <div id="SearchDropdown" class="search-dropdown-content">
            <div class="search-result">
              {this.state.searchResult.length == 0 ? (
                <div />
              ) : (
                  <ul id="search-result" style={{ width: "100%", direction: 'rtl' }}>
                    {this.state.searchResult.map((search, l) => (
                      <li key={"li" + l} id={"li" + l} class="search-result-li"  >
                        <a
                          id={"link" + l}
                          onClick={this.movieClicked.bind(this, search.id)}
                          class="search-result-item"
                        />
                        <div >
                          <span >
                            <span style={{ width: '100%' }}>{search.title}</span>
                            <span style={{ width: '100%' }}>{search.role + " : " + search.agent}</span>
                          </span>
                          <img
                            src={
                              MediaUrl + "/image.ashx?file=" + search.thumbnail.url + "&width=200"
                            }
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
