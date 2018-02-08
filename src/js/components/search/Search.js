import React from "react";
import { MainUrl } from "../../util/RequestHandler";
import { inject, observer } from "mobx-react";
import exit from "../../../img/search.svg";
import { Link } from "react-router-dom";

@inject("session", "search","movieStore")
@observer
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResult: null, searchInputValue: "", sarachIndex: 0 };
  }

  componentDidMount() {
    $(window).click(
      function() {
        this.setState({ searchResult: null, searchInputValue: "" });
      }.bind(this)
    );

    $("#SearchDropdown").click(function(event) {
      event.stopPropagation();
    });
    $("#searchInput").click(function(event) {
      event.stopPropagation();
    });

    $("#searchInput").on(
      "keyup",
      function(e) {
        if (e.keyCode == 13) {
          this.onClick();
        }
      }.bind(this)
    );
  }

  componentDidUpdate() {}

  searchSelectionAndHover() {
    $(".search-result-item").on(
      "mouseover",
      function(e) {
        var $listItems = $(".search-result-item");
        $listItems.removeClass("selected");
        if (e.target.id != undefined && e.target.id != "") {
          $("#" + e.target.id).addClass("selected");
        }
      }.bind(this)
    );

    var listItems = document.getElementsByClassName("search-result-item");
    $("#searchInput").on("keydown", function(e) {
      var key = e.keyCode,
        selected,
        current,
        index = -1;

      for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].classList.contains("selected")) {
          selected = listItems[i];
          index = i;
        }
      }

      if (key != 40 && key != 38 && key != 13) return;
      if (selected != undefined && selected != null)
        $("#" + selected.id).removeClass("selected");

      if (key == 13) {
        if (selected != undefined && selected != null) {
          selected.click();
        }
        e.stopPropagation();
        return;
      } else if (key == 40) {
        // Down key
        if (index == listItems.length - 1) {
          current = listItems[0];
        } else {
          current = listItems[index + 1];
        }
      } else if (key == 38) {
        // Up key
        if (index == 0) {
          current = listItems[listItems.length - 1];
        } else {
          current = listItems[index - 1];
        }
      }
      $("#" + current.id).addClass("selected");
    });
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
          $(".search-result-item").off("mouseover");
          $("#searchInput").off("keydown");
          this.searchSelectionAndHover();
        }.bind(this),
        error: function(request, textStatus, errorThrown) {}
      });
    } else {
      this.setState({ searchResult: null });
    }
  }

  search() {
    if (this.state.searchInputValue != "") {
      this.props.search.fetchSearchList(this.state.searchInputValue);
      this.props.session.history.push("/search/" + this.state.searchInputValue);
      this.setState({
        searchResult: null,
        searchInputValue: "",
        searchIndex: 0
      });
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
  movieClicked(movieId) {
    this.props.movieStore.movieId = movieId;
    this.props.movieStore.fetchMovie();
    this.props.session.history.push("/movie/" + movieId);
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
                <ul id="search-result" style={{ width: "100%" }}>
                  {this.state.searchResult.map((search, l) => (
                    <li key={"li" + l} id={"li" + l} class="search-result-li">
                      <a
                        id={"link" + l}
                        onClick={this.movieClicked.bind(this, search.id)}
                        class="search-result-item"
                      />
                      <div>
                        <span>
                          <span>{search.title}</span>
                          {search.director != null ? (
                            <span>{"کارگردان : " + search.director}</span>
                          ) : null}
                        </span>
                        <img
                          src={
                            MainUrl + "/image.ashx?file=" + search.thumbnail.url
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
