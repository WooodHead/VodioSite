import { action, observable } from "mobx";
import { MainUrl } from "../util/RequestHandler";
var moment = require("moment-jalaali");
import { latinToPersian, convertMillisecondToString } from "../util/util";

class MovieStore {
  @observable movie = false;
  @observable related = "0";
  @observable movieId = -1;
  @observable director = null;
  @observable researcher = null;
  @observable actors = null;
  @observable provider = null;
  @observable relatedMovies = null;
  @observable durationString = "";
  sessionStore = null;
  constructor(session) {
    this.sessionStore = session;
  }

  @action
  fetchRoles() {
    $.ajax({
      type: "GET",
      url: MainUrl + "/role.ashx?movieId=" + this.movieId,
      success: function(data, textStatus, request) {
        var directorTemp;
        var ActorTemp;
        var providerTemp;
        var ResearcherTemp;
        $.each(data.data, function(index, role) {
          if (role.name == "کارگردان") {
            directorTemp = role;
          } else if (role.name == "بازیگر") {
            ActorTemp = role;
          } else if (role.name == "تهیه کننده") {
            providerTemp = role;
          } else if (role.name == "پژوهشگر") {
            ResearcherTemp = role;
          }
        });
        this.director = directorTemp;
        this.researcher = ResearcherTemp;
        this.provider = providerTemp;
        this.actors = ActorTemp;
      }.bind(this),
      error: function(request, textStatus, errorThrown) {}
    });
  }

  @action
  fetchRelated() {
    $.ajax({
      type: "GET",
      url: MainUrl + "/related.ashx?movieId=" + this.movieId,
      success: function(data, textStatus, request) {
        this.relatedMovies = data.data;
      }.bind(this),
      error: function(request, textStatus, errorThrown) {}
    });
  }

  @action
  fetchMovie() {
    $.ajax({
      type: "GET",
      headers: {
        token: this.sessionStore.session
      },
      url: MainUrl + "/movie.ashx?movieId=" + this.movieId,
      success: function(data, textStatus, request) {
        this.movie = data.data;
        this.durationString = convertMillisecondToString(this.movie.duration);
        this.fetchRoles();
        this.fetchRelated();
      }.bind(this),
      error: function(request, textStatus, errorThrown) {}
    });
  }
}

export default MovieStore;
