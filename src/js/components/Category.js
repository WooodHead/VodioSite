import React from "react";
import { inject, observer } from "mobx-react";
import { MainUrl } from "../util/RequestHandler";
import "../../css/category.css";

@inject("session")
@observer
export default class Category extends React.Component {
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
    var width = $(window).width();
    if (width > 740) {
      this.props.session.history.push("/list");
      this.props.session.offset = 0;
      var url = this.makeUrl(category, genre);
      this.props.session.listUrl = url;
      console.log("asdf " + url);
      this.props.session.isInitiating = true;
      this.props.session.title = category.name;
      this.props.session.fetchList();
      this.closeMainMenu();
    }
  }
  closeMainMenu() {
    $(".header-category-drop-down").hide();
  }
  toggleCategory() {
    $(".header-category-drop-down").slideToggle(100);
  }

  componentDidUpdate() {
    $(window).click(function() {
      var width = $(window).width();
      if (width > 740) {
        $("#category-header").hide(100);
      }
    });

    $("#header-category-show").click(
      function(event) {
        this.toggleCategory();
        event.stopPropagation();
      }.bind(this)
    );

    if (this.props.categories != null) {
      var width = $(window).width();
      if (width > 740) {
        this.props.categories.map(category =>
          $("#" + "category" + category.id).hover(
            function() {
              $("#" + "category12" + category.id).show();
            },
            function() {
              $("#" + "category12" + category.id).hide();
            }
          )
        );
      } else {
        var firstCategoryId = -1;
        this.props.categories.forEach(category => {
          firstCategoryId == -1 ? (firstCategoryId = category.id) : 0;
          $("#" + "category" + category.id).click(
            function() {
              this.props.categories.forEach(element => {
                $("#" + "category12" + element.id).hide();
              });
              $("#" + "category12" + category.id).show();
            }.bind(this)
          );
        });
        if (firstCategoryId != -1)
          $("#" + "category12" + firstCategoryId).show();
      }
    }
  }

  render() {
    if (this.props.categories != null) {
      $("#category-header").width(100 * this.props.categories.length);
    }
    return (
      <div class="header-category">
        <div class="header-category-show" id="header-category-show">
          <span>دسته‌بندی‌ها</span>
        </div>
        <div id="category-header" class="header-category-drop-down">
          <div
            class="closemainmenu"
            id="closemainmenu"
            onClick={this.closeMainMenu.bind(this)}
          />
          <div class="header-category-drop-down-main-menu">
            {this.props.categories != null ? (
              <ul
                style={{
                  width: "100%",
                  height: "200px"
                }}
              >
                {this.props.categories.map(category => (
                  <li
                    id={"category" + category.id}
                    key={category.id}
                    className="header-category-drop-down-main-menu-item"
                  >
                    <a
                      id={category.id}
                      onClick={this.onCategoryClicked.bind(
                        this,
                        category,
                        null
                      )}
                    >
                      <span className="icon-play-button hcdmmi-icon" />
                      <strong>{category.name}</strong>
                    </a>
                    <SubCategory
                      category={category}
                      identifier={"category12" + category.id}
                      onClose={this.closeMainMenu.bind(this)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div
                className="loader-container"
                style={{
                  display: "block",
                  marginLeft: "44%",
                  marginTop: "110px"
                }}
              >
                <div className="loader" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

@inject("session")
@observer
class SubCategory extends React.Component {
  makeUrl(category, genre) {
    var url = MainUrl + "/movielist.ashx";
    if (category || genre) {
      url = url + "?";
    }
    if (category) {
      url = url + "categoryId=" + category.id;
    }
    if (genre) {
      url = url + "&genreId=" + genre.id;
    }
    return url;
  }

  onGenreClicked(category, genre) {
    this.props.session.history.push("/list");
    this.props.session.offset = 0;
    var url = this.makeUrl(category, genre);
    this.props.session.listUrl = url;
    var title = category.name;
    if (genre) {
      title = title + " - " + genre.name;
    }
    this.props.session.title = title;
    this.props.session.isInitiating = true;
    this.props.session.fetchList();
    this.props.onClose();
  }

  render() {
    var allGenres = null;
    if ($(window).width() < 741) {
      allGenres = (
        <li>
          <a
            onClick={this.onGenreClicked.bind(this, this.props.category, null)}
          >
            همه
          </a>
        </li>
      );
    }

    return (
      <ul id={this.props.identifier}>
        {allGenres}
        {this.props.category.genres.map(genre => (
          <li key={genre.id}>
            <a
              onClick={this.onGenreClicked.bind(
                this,
                this.props.category,
                genre
              )}
            >
              {genre.name}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}
