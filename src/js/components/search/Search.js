import React from "react";
import { MainUrl } from "../../util/RequestHandler";
import { inject, observer } from "mobx-react";
import exit from "../../../img/search.svg";
import { Link } from "react-router-dom";

@inject("session")
@observer
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResult: null, searchInputValue: "" };
  }

  componentDidMount() {
    $("#searchContainer").on(
      "focusout",
      function() {
        this.setState({ searchResult: null, searchInputValue: "" });
      }.bind(this)
    );
  }

  close() {
    $(".header-search-drop").hide(200);
    $(".search-cover-page").fadeToggle(100);
    $("#SearchDropdown").fadeToggle(100);
  }

  toggleSearch() {
    this.setState({ searchInputValue: "" });
    this.setState({ searchResult: null });
    $(".header-search-drop").toggle(200);
    $(".search-cover-page").fadeToggle(100);
    $("#SearchDropdown").fadeToggle(100);
  }

  searchFunction(e) {
    this.setState({ searchInputValue: e.target.value });
    if (e.target.value.length > 2) {
      $.ajax({
        type: "GET",
        url: MainUrl + "/search.ashx?keyword=" + e.target.value,
        success: function(data, textStatus, request) {
          this.setState({ searchResult: data.data });
        }.bind(this),
        error: function(request, textStatus, errorThrown) {}
      });
    } else {
      this.setState({ searchResult: null });
    }
  }

  search() {
    if (this.state.searchInputValue != "") {
      this.props.session.history.push("/search/" + this.state.searchInputValue);
      this.setState({ searchResult: null, searchInputValue: "" });
    } else {
      $(".search-container").addClass("no-input-shake");
      setTimeout(function() {
        $(".search-container").removeClass("no-input-shake");
      }, 500);
    }
  }

  onClick() {
    $("#searchInput").focus();
    // if ($("#searchInput").width() >= 280) {
    this.search();
    // } else {
    //   $("#searchContainer").width(340);
    //   $("#searchInput").width(285);
    // }
  }

  render() {
    return (
      <div id="searchContainer" class="search-container">
        <input
          id="searchInput"
          className="search-header-input search-dropdown"
          onChange={this.searchFunction.bind(this)}
          value={this.state.searchInputValue}
          placeholder="جستجو ..."
        />

        <img
          style={{
            width: "24px",
            height: "24px",
            padding: "6px"
          }}
          src={exit}
          onClick={this.onClick.bind(this)}
        />

        {this.state.searchResult != null ? (
          <div id="SearchDropdown" class="search-dropdown-content">
            <div class="search-result">
              {this.state.searchResult.length == 0 ? (
                <div />
              ) : (
                <ul style={{ width: "100%" }}>
                  {this.state.searchResult.map((search, l) => (
                    <li key={l} class="search-result-li">
                      <Link to={{ pathname: "/movie/" + search.id }}>
                        <div>
                          <span>
                            <span>{search.title}</span>
                            {search.director != null ? (
                              <span>{"کارگردان : " + search.director}</span>
                            ) : null}
                          </span>
                          <img
                            src={
                              "http://localhost:58583//image.ashx?file=" +
                              search.thumbnail.url
                            }
                          />
                        </div>
                      </Link>
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
