import React from "react";
import { inject, observer } from "mobx-react";
import { MainUrl } from "../util/RequestHandler";
import "../../css/category.css";
import categoryImage from '../../img/category.svg';

@inject("session", "gaStore")
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
    if (width > 750) {
      this.props.gaStore.addEvent("CategoriesList", "click", (category.id + 1).toString());
      this.props.session.gaUrl = "/list/" + (category.id + 1) + "/0";
      this.props.session.history.push("/list/" + (category.id + 1) + "/0");
      this.props.session.offset = 0;
      var url = this.makeUrl(category, genre);
      this.props.session.listUrl = url;
      this.props.session.isInitiating = true;
      this.props.session.title = category.name;
      this.props.session.fetchList(1);
      this.closeMainMenu();
    }
  }
  closeMainMenu() {
    $(".header-category-drop-down").hide();
  }

  toggleCategory() {
    if ($(".header-category-drop-down").css("display") == "none") {
      this.props.gaStore.addEvent("Home", "click", "categoryMenu");
    }
    $(".header-category-drop-down").slideToggle(100);
  }
  componentDidUpdate() {
    $(window).click(function () {
      var width = $(window).width();
      if (width > 750) {
        $("#category-header").hide(100);
      }
    });

    $("#header-category-show").click(
      function (event) {
        this.toggleCategory();
        event.stopPropagation();
      }.bind(this)
    );

    if (this.props.categories != null) {
      var width = $(window).width();
      if (width > 750) {
        this.props.categories.map(category =>
          $("#" + "category" + category.id).hover(
            function () {
              $("#" + "category12" + category.id).show();
            },
            function () {
              $("#" + "category12" + category.id).hide();
            }
          )
        );
      } else {
        var firstCategoryId = -1;
        this.props.categories.forEach(category => {
          firstCategoryId == -1 ? (firstCategoryId = category.id) : 0;
          $("#" + "category" + category.id).click(
            function () {
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
      var width = $(window).width();
      if (width > 750) {
        $("#category-header").width(100 * this.props.categories.length);
      } else {
        $("#category-header").width(220);
      }
    }
    return (
      <div class="header-category">
        <div class="header-category-show" id="header-category-show">
          <img style={{
            width: '13px',
            marginRight: '20px'
          }} src={categoryImage} />
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
                  height: "230px"
                }}
              >
                {this.props.categories.map(category => (
                  <li
                    id={"category" + category.id}
                    key={category.id}
                    className="header-category-drop-down-main-menu-item"
                  >
                    <a
                      class="category-item"
                      id={category.id}
                      onClick={this.onCategoryClicked.bind(
                        this,
                        category,
                        null
                      )}
                    >
                      <img src={MainUrl +
                        "/image.ashx?file=" +
                        category.url} style={{
                          width: '40px',
                          height: '30px',
                          marginRight: 'calc(50% - 20px)',
                          marginTop: '15px',
                          objectFit: 'contain'
                        }} />
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

@inject("session", "gaStore")
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
    var gId = 0;
    if (genre != null) {
      gId = genre.id + 1;
    }
    this.props.gaStore.addEvent("CategoriesList", "click", (category.id + 1).toString() + " - " + gId.toString());
    this.props.session.gaUrl = "/list/" + (category.id + 1) + "/" + gId;
    this.props.session.history.push("/list/" + (category.id + 1) + "/" + gId);
    this.props.session.offset = 0;
    var url = this.makeUrl(category, genre);
    
    this.props.session.listUrl = url;
    var title = category.name;
    if (genre) {
      title = title + " - " + genre.name;
    }
    this.props.session.title = title;
    this.props.session.isInitiating = true;
    this.props.session.fetchList(2);
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
