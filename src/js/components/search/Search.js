import React from "react";
import { MainUrl } from "../../util/RequestHandler";
import { inject, observer } from "mobx-react";

@inject("session")
@observer
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResult: null, searchInputValue: "" };
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
      $(".header-search-drop").hide(200);
      $(".search-cover-page").fadeToggle(100);
      $("#SearchDropdown").fadeToggle(100);
      this.props.session.history.push("/search/" + this.state.searchInputValue);
    } else {
      $(".header-search-drop").addClass("no-input-shake");
      setTimeout(function() {
        $(".header-search-drop").removeClass("no-input-shake");
      }, 500);
    }
  }

  render() {
    return (
      <div className="header-search">
        <div
          className="header-search-show"
          onClick={this.toggleSearch.bind(this)}
        />
        <div className="header-search-drop">
          <input
            id="searchInput"
            type="text"
            className="search-header-input search-dropdown"
            placeholder="جستجو کن ..."
            onChange={this.searchFunction.bind(this)}
            value={this.state.searchInputValue}
          />

          <button
            type="submit"
            className="search-header-submit"
            onClick={this.search.bind(this)}
          />

          <div
            className="header-search-close"
            onClick={this.close.bind(this)}
          />
        </div>
        {this.state.searchResult != null ? (
          <div id="SearchDropdown" class="search-dropdown-content">
            <div class="search-result">
              {this.state.searchResult.length == 0 ? (
                <div />
              ) : (
                <ul>
                  {this.state.searchResult.map((search, l) => (
                    <li key={l} class="search-result-li">
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
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : null}
        <div class="search-cover-page" onClick={this.toggleSearch.bind(this)} />
      </div>
    );
  }
}
