import React from "react";
import { inject, observer } from "mobx-react";
import { MainUrl } from "../util/RequestHandler";

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
    $("#category" + category.id).slideToggle(100);
    // this.props.session.history.push("/list");
    // this.props.session.offset = 0;
    // var url = this.makeUrl(category, genre);
    // this.props.session.listUrl = url;
    // this.props.session.isInitiating = true;
    // this.props.session.title = category.name;
    // this.props.session.fetchList();
  }
  closeMainMenu() {
    $(".header-category-drop-down").hide();
    $(".cover-page").fadeToggle(100);
  }
  toggleCategory() {
    $(".header-category-drop-down").slideToggle(100);
    $(".cover-page").fadeToggle(100);
  }
  render() {
    if (this.props.categories != null) {
      $("#category-header").width(100 * this.props.categories.length);
    }
    return (
      <div className="header-category">
        <div
          className="header-category-show"
          id="header-category-show"
          onClick={this.toggleCategory}
        >
          <span>دسته‌بندی‌ها</span>
        </div>
        <div id="category-header" className="header-category-drop-down">
          <div className="closemainmenu" id="closemainmenu" />
          <div className="header-category-drop-down-main-menu">
            {this.props.categories != null ? (
              <ul
                style={{
                  width: "100%",
                  height: "200px"
                }}
              >
                {this.props.categories.map(category => (
                  <li
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
                      id={"category" + category.id}
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
        <div class="cover-page" onClick={this.toggleCategory} />
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
    this.props.session.title = category.name + " - " + genre.name;
    this.props.session.isInitiating = true;
    this.props.session.fetchList();
  }

  render() {
    return (
      <ul id={this.props.id}>
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
