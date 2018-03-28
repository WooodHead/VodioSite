import { action, observable } from "mobx";
import { MainUrl } from "../util/RequestHandler";
var moment = require("moment-jalaali");
import { latinToPersian, convertSecondToString } from "../util/util";

class SessionStore {
  @observable session = null;
  @observable showLogin = false;
  @observable showFooter = true;
  @observable history = null;
  @observable showLoading = false;

  @observable showPlayerFullscreen = false;

  @observable isMobile = false;
  @observable isIosDevice = false;

  @observable movieIdForPurchase = -1;

  @observable title = "";
  @observable reload = false;
  @observable listElements = [];
  @observable listElementsCount = -1;
  @observable listUrl = "";
  @observable isLoading = false;
  @observable offset = 0;
  @observable size = 20;
  @observable isInitiating = false;

  @observable commentText = null;
  @observable commentName = null;
  @observable commentEmail = null;
  @observable commentMovieId = -1;

  @observable commentList = null;
  @observable commentListCount = 0;

  @observable categories = null;
  @observable gaUrl = null;

  gaStore = null;
  constructor(gas) {
    this.gaStore = gas;
  }

  @action
  fetchCommentList() {
    $.ajax({
      type: "Get",
      url: MainUrl + "/comments.ashx?movieId=" + this.commentMovieId,
      success: function (data, textStatus, jQxhr) {
        this.commentListCount = 0;
        this.commentList = null;
        if (data.errorCode != 0) {
        } else {
          if (data.data != null) {
            data.data.forEach(element => {
              var date = new Date(element.millisecond);

              var m = moment(
                date.getUTCFullYear() +
                "/" +
                (date.getUTCMonth() + 1) +
                "/" +
                date.getUTCDate(),
                "YYYY/M/D"
              );

              var month = "";
              switch (m.jMonth()) {
                case 0:
                  month = "فروردین";
                  break;
                case 1:
                  month = "اردیبهشت";
                  break;
                case 2:
                  month = "خرداد";
                  break;
                case 3:
                  month = "تیر";
                  break;
                case 4:
                  month = "مرداد";
                  break;
                case 5:
                  month = "شهریور";
                  break;
                case 6:
                  month = "مهر";
                  break;
                case 7:
                  month = "آبان";
                  break;
                case 8:
                  month = "آذر";
                  break;
                case 9:
                  month = "دی";
                  break;
                case 10:
                  month = "بهمن";
                  break;
                case 11:
                  month = "اسفند";
                  break;
                default:
                  break;
              }

              element.millisecond = latinToPersian(
                m.jDate() + " " + month + " " + m.jYear()
              );
            });
            this.commentList = data.data;
            this.commentListCount = data.count;
          }
        }
      }.bind(this),
      error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
  }

  @action
  fetchList() {
    if (this.offset == 0) {
      this.gaStore.addPageView(this.gaUrl);
      this.listElements = [];
      this.isLoading = false;
    }
    $.ajax({
      type: "GET",
      url: this.listUrl + "&offset=" + this.offset + "&size=" + this.size,
      success: function (es, textStatus, request) {
        this.listElements = this.listElements.concat(es.data);
        this.listElementsCount = es.count;
        this.isLoading = false;
      }.bind(this),
      error: function (request, textStatus, errorThrown) { }
    });
  }

  @observable purchaseTitle = "خریدها";
  @observable purchaseListElements = [];
  @observable purchaseListElementsCount = -1;
  @observable purchaseListUrl = "";
  @observable purchaseIsLoading = false;
  @observable purchaseOffset = 0;
  @observable purchaseSize = 20;
  @observable purchseIsInitiating = false;

  @action
  fetchPurchaseList() {
    if (this.purchaseOffset == 0) {
      this.purchaseListElements = [];
      this.purchaseIsLoading = false;
    }
    $.ajax({
      type: "GET",
      headers: {
        token: this.session
      },
      url:
        this.purchaseListUrl +
        "offset=" +
        this.purchaseOffset +
        "&size=" +
        this.purchaseSize,
      success: function (es, textStatus, request) {
        if (es.data != null) {
          this.purchaseListElements = this.purchaseListElements.concat(es.data);
        }
        this.purchaseListElementsCount = es.count;
        this.purchaseIsLoading = false;
      }.bind(this),
      error: function (request, textStatus, errorThrown) {
        if (request.status == 403) {
          this.session = null;
          this.history.push("/");
        }
      }.bind(this)
    });
  }
}

export default SessionStore;
