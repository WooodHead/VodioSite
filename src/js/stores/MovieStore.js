import { action, observable } from "mobx";
import { MainUrl } from "../util/RequestHandler";
var moment = require("moment-jalaali");
import { latinToPersian, convertSecondToString } from "../util/util";

class MovieStore {
  @observable movie = false;
  @observable related = "0";
  @observable movieId = -1;
  @observable director = null;
  @observable researcher = null;
  @observable actors = null;
  @observable animators = null;
  @observable cameramans = null;
  @observable editors = null;
  @observable writers = null;
  @observable composers = null;
  @observable provider = null;
  @observable relatedMovies = null;
  @observable durationString = "";

  @observable movieDetailClicked = false;
  @observable commentClicked = false;
  sessionStore = null;
  constructor(session) {
    this.sessionStore = session;
  }

  @action
  fetchRoles() {
    $.ajax({
      type: "GET",
      url: MainUrl + "/role.ashx?movieId=" + this.movieId,
      success: function (data, textStatus, request) {
        var directorTemp;
        var ActorTemp;
        var providerTemp;
        var ResearcherTemp;
        var animatorTemp;
        var cameramanTemp;
        var editorTemp;
        var writerTemp;
        var composerTemp;
        $.each(data.data, function (index, role) {
          if (role.name == "کارگردان") {
            directorTemp = role;
          } else if (role.name == "بازیگر") {
            ActorTemp = role;
          } else if (role.name == "تهیه کننده") {
            providerTemp = role;
          } else if (role.name == "پژوهشگر") {
            ResearcherTemp = role;
          } else if (role.name == "صدابردار") {
            composerTemp = role;
          } else if (role.name == "تدوین") {
            editorTemp = role;
          } else if (role.name == "نویسنده") {
            writerTemp = role;
          } else if (role.name == "آهنگ‌ساز") {
            composerTemp = role;
          } else if (role.name == "انیماتور") {
            animatorTemp = role;
          }
        });
        this.director = directorTemp;
        this.researcher = ResearcherTemp;
        this.provider = providerTemp;
        this.actors = ActorTemp;
        this.composers = composerTemp;
        this.editors = editorTemp;
        this.writers = writerTemp;
        this.composers = composerTemp;
        this.animators = animatorTemp;

        this.sessionStore.showLoading = false;
      }.bind(this),
      error: function (request, textStatus, errorThrown) {
        this.sessionStore.showLoading = false;
      }
    });
  }

  @action
  fetchRelated() {
    $.ajax({
      type: "GET",
      url: MainUrl + "/related.ashx?movieId=" + this.movieId,
      success: function (data, textStatus, request) {
        this.relatedMovies = data.data;
      }.bind(this),
      error: function (request, textStatus, errorThrown) { }
    });
  }

  @action
  fetchMovie() {
    this.sessionStore.showLoading = true;
    console.log(this.sessionStore.session);
    console.log(MainUrl + "/movie.ashx?movieId=" + this.movieId);
    $.ajax({
      type: "GET",
      headers: {
        token: this.sessionStore.session
      },
      url: MainUrl + "/movie.ashx?movieId=" + this.movieId,
      success: function (data, textStatus, request) {
        this.movie = data.data;
        this.durationString = convertSecondToString(this.movie.duration);
        this.fetchRoles();
        this.fetchRelated();
        this.movieDetailClicked = false;
        this.commentClicked = false;
        window.scrollTo(0, 0);
      }.bind(this),
      error: function (request, textStatus, errorThrown) {
        if (request.status == 403) {
          this.sessionStore.session = null;
          this.fetchMovie();
        }
      }.bind(this)
    });
  }
}

export default MovieStore;
