import React from "react";
import { MainUrl } from "../../util/RequestHandler";
import { inject, observer } from "mobx-react";
import search from "../../../img/search.png";

@inject("session")
@observer
export default class MobileSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResult: null, searchInputValue: "" };
  }

  componentDidMount() {
    $(window).click(
      function() {
        this.setState({ searchResult: null, searchInputValue: "" });
      }.bind(this)
    );

    $("#MobileSearchInput").click(function(event) {
      event.stopPropagation();
    });
  }

  onClick() {
    console.log("asdf");
    $("#MobileSearchInput").focus();
    this.search();
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
      $(".mobile-search").addClass("no-input-shake");
      setTimeout(function() {
        $(".mobile-search").removeClass("no-input-shake");
      }, 500);
    }
  }

  render() {
    return (
      <div class="mobile-search">
        <div
          style={{
            width: "100%",
            display: "inline-flex",
            paddingRight: "20px",
            paddingLeft: "20px",
            height: "35px"
          }}
        >
          <input
            id="MobileSearchInput"
            placeholder="جستجو ..."
            value=""
            onChange={this.searchFunction.bind(this)}
            value={this.state.searchInputValue}
            style={{
              width: "100%",
              borderRadius: "17.5px",
              paddingRight: "10px",
              border: "1px solid rgba(0,0,0,0.1)",
              fontSize: "12px",
              fontFamily: "IRSans",
              background: "#f0f0f0",
              color: "#eb0089"
            }}
          />
          <img
            style={{
              width: "35px",
              height: "35px",
              padding: "5px",
              top: "0px",
              left: "0px",
              float: "left"
            }}
            src={search}
            onClick={this.onClick.bind(this)}
          />
        </div>

        {this.state.searchResult != null ? (
          <div id="MobileSearchDropdown" class="mobile-search-dropdown-content">
            <div class="mobile-search-result">
              {this.state.searchResult.length == 0 ? (
                <div />
              ) : (
                <ul>
                  {this.state.searchResult.map((search, l) => (
                    <li key={l} class="mobile-search-result-li">
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
      </div>
    );
  }
}
