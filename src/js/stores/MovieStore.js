import { action, observable } from "mobx";
import { MainUrl } from "../util/RequestHandler";
var moment = require("moment-jalaali");
import { latinToPersian, convertSecondToString, urlCorrection } from '../util/util'

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
  @observable soundRecorders = null;
  @observable sounders = null;
  @observable narrations = null;
  @observable redirectToMovie = false;

  @observable showLoading = "";
  @observable transactionId = -1;

  @observable purchaseGaSent = false;
  @observable purchaseGaResult = "";

  @observable movieDetailClicked = false;
  @observable commentClicked = false;

  @observable paymentMethods = null;

  sessionStore = null;
  gaStore = null
  constructor(session, gastore) {
    this.sessionStore = session;
    this.gaStore = gastore;
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
        var soundRecorderTemp;
        var writerTemp;
        var composerTemp;
        var sounderTemp; var narrationTemp;
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
            soundRecorderTemp = role;
          } else if (role.name == "تدوین") {
            editorTemp = role;
          } else if (role.name == "نویسنده") {
            writerTemp = role;
          } else if (role.name == "آهنگ‌ساز") {
            composerTemp = role;
          } else if (role.name == "انیماتور") {
            animatorTemp = role;
          } else if (role.name == "صداگذار") {
            sounderTemp = role;
          } else if (role.name == "نریشن") {
            narrationTemp = role;
          } else if (role.name == "فیلم‌بردار") {
            cameramanTemp = role;
          }
        });
        this.director = directorTemp;
        this.researcher = ResearcherTemp;
        this.provider = providerTemp;
        this.actors = ActorTemp;
        this.editors = editorTemp;
        this.writers = writerTemp;
        this.composers = composerTemp;
        this.animators = animatorTemp;
        this.soundRecorders = soundRecorderTemp;
        this.sounders = sounderTemp;
        this.cameramans = cameramanTemp;
        this.narrations = narrationTemp;
        this.showLoading = false;
      }.bind(this),
      error: function (request, textStatus, errorThrown) {
        this.showLoading = false;
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
    this.showLoading = true;
    $.ajax({
      type: "GET",
      headers: {
        token: this.sessionStore.session
      },
      url: MainUrl + "/movie.ashx?movieId=" + this.movieId,
      success: function (data, textStatus, request) {
        if (data.data != null) {
          var directorTemp;
          var ActorTemp;
          var providerTemp;
          var ResearcherTemp;
          var animatorTemp;
          var cameramanTemp;
          var editorTemp;
          var soundRecorderTemp;
          var writerTemp;
          var composerTemp;
          var sounderTemp; var narrationTemp;
          $.each(data.data.roles, function (index, role) {
            if (role.name == "کارگردان") {
              directorTemp = role;
            } else if (role.name == "بازیگر") {
              ActorTemp = role;
            } else if (role.name == "تهیه کننده") {
              providerTemp = role;
            } else if (role.name == "پژوهشگر") {
              ResearcherTemp = role;
            } else if (role.name == "صدابردار") {
              soundRecorderTemp = role;
            } else if (role.name == "تدوین") {
              editorTemp = role;
            } else if (role.name == "نویسنده") {
              writerTemp = role;
            } else if (role.name == "آهنگ‌ساز") {
              composerTemp = role;
            } else if (role.name == "انیماتور") {
              animatorTemp = role;
            } else if (role.name == "صداگذار") {
              sounderTemp = role;
            } else if (role.name == "نریشن") {
              narrationTemp = role;
            } else if (role.name == "فیلم‌بردار") {
              cameramanTemp = role;
            }
          });
          this.director = directorTemp;
          this.researcher = ResearcherTemp;
          this.provider = providerTemp;
          this.actors = ActorTemp;
          this.editors = editorTemp;
          this.writers = writerTemp;
          this.composers = composerTemp;
          this.animators = animatorTemp;
          this.soundRecorders = soundRecorderTemp;
          this.sounders = sounderTemp;
          this.cameramans = cameramanTemp;
          this.narrations = narrationTemp;

          this.movie = data.data;
          this.durationString = convertSecondToString(this.movie.duration);
          this.fetchRelated();
          this.movieDetailClicked = false;
          this.commentClicked = false;
          if (this.transactionId != -1) {
            this.gaStore.addTransaction(this.movie.title, this.movie.price, this.transactionId)
            this.transactionId = -1;
          }
          if (this.purchaseGaSent == true) {
            this.purchaseGaSent = false;
            this.gaStore.addEvent("Purchase", this.purchaseGaResult, this.movie.id.toString(), this.movie.price.toString())
          }
          if (document.getElementById("movie-container") != null) {
            $("#movie-container").animate({ scrollTop: 0 }, "fast");
            $('html, body').animate({
              scrollTop: 0
            }, 0);
          }
          if (this.redirectToMovie == true && data.data.bought == true) {
            this.redirectToMovie = false;
            this.sessionStore.history.push("/movie/" + this.movie.id + "/" + urlCorrection(this.movie.title))
          }


          this.showLoading = false;
        }
      }.bind(this),
      error: function (request, textStatus, errorThrown) {
        if (request.status == 403) {
          this.sessionStore.session = null;
          this.fetchMovie();
        }
      }.bind(this)
    });
  }

  @action
  fetchMovieWithPaymentMethods() {
    this.showLoading = true;
    $.ajax({
      type: "GET",
      headers: {
        token: this.sessionStore.session
      },
      url: MainUrl + "/movie.ashx?movieId=" + this.movieId,
      success: function (data, textStatus, request) {
        if (data.data != null) {
          var directorTemp;
          var ActorTemp;
          var providerTemp;
          var ResearcherTemp;
          var animatorTemp;
          var cameramanTemp;
          var editorTemp;
          var soundRecorderTemp;
          var writerTemp;
          var composerTemp;
          var sounderTemp; var narrationTemp;
          $.each(data.data.roles, function (index, role) {
            if (role.name == "کارگردان") {
              directorTemp = role;
            } else if (role.name == "بازیگر") {
              ActorTemp = role;
            } else if (role.name == "تهیه کننده") {
              providerTemp = role;
            } else if (role.name == "پژوهشگر") {
              ResearcherTemp = role;
            } else if (role.name == "صدابردار") {
              soundRecorderTemp = role;
            } else if (role.name == "تدوین") {
              editorTemp = role;
            } else if (role.name == "نویسنده") {
              writerTemp = role;
            } else if (role.name == "آهنگ‌ساز") {
              composerTemp = role;
            } else if (role.name == "انیماتور") {
              animatorTemp = role;
            } else if (role.name == "صداگذار") {
              sounderTemp = role;
            } else if (role.name == "نریشن") {
              narrationTemp = role;
            } else if (role.name == "فیلم‌بردار") {
              cameramanTemp = role;
            }
          });
          this.director = directorTemp;
          this.researcher = ResearcherTemp;
          this.provider = providerTemp;
          this.actors = ActorTemp;
          this.editors = editorTemp;
          this.writers = writerTemp;
          this.composers = composerTemp;
          this.animators = animatorTemp;
          this.soundRecorders = soundRecorderTemp;
          this.sounders = sounderTemp;
          this.cameramans = cameramanTemp;
          this.narrations = narrationTemp;

          this.movie = data.data;
          this.durationString = convertSecondToString(this.movie.duration);
          this.fetchRelated();
          this.movieDetailClicked = false;
          this.commentClicked = false;
          if (this.transactionId != -1) {
            this.gaStore.addTransaction(this.movie.title, this.movie.price, this.transactionId)
            this.transactionId = -1;
          }
          if (this.purchaseGaSent == true) {
            this.purchaseGaSent = false;
            this.gaStore.addEvent("Purchase", this.purchaseGaResult, this.movie.id.toString(), this.movie.price.toString())
          }
          if (document.getElementById("movie-container") != null) {
            $("#movie-container").animate({ scrollTop: 0 }, "fast");
            $('html, body').animate({
              scrollTop: 0
            }, 0);
          }
          if (this.redirectToMovie == true && data.data.bought == true) {
            this.redirectToMovie = false;
            this.sessionStore.history.push("/movie/" + this.movie.id + "/" + urlCorrection(this.movie.title))
          } else {
            $.ajax({
              type: "GET",
              headers: {
                token: this.sessionStore.session
              },
              url: MainUrl + "/paymentmethod.ashx?movieId=" + this.movie.id,
              success: function (data, textStatus, request) {
                if (data.errorCode == 0) {
                  this.paymentMethods = data.data
                } else {
                  this.redirectToMovie = false;
                  this.sessionStore.history.push("/movie/" + this.movie.id + "/" + urlCorrection(this.movie.title))
                }
              }.bind(this),
              error: function (request, textStatus, errorThrown) { }
            });
          }
          this.showLoading = false;
        }
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

