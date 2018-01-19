import { action, observable } from "mobx";
import { MainUrl } from "../util/RequestHandler";

class SessionStore {
  @observable session = null;
  @observable showLogin = false;
  @observable showFooter = true;
  @observable history = null;
  @observable showLoading = false;

  @observable isMobile = false;
  @observable isIosDevice = false;

  @observable movieIdForPurchase = -1;

  @observable title = "لیست";
  @observable reload = false;
  @observable listElements = [];
  @observable listUrl = "";
  @observable isLoading = false;
  @observable offset = 0;
  @observable size = 20;
  @observable isInitiating = false;

  @action
  fetchList() {
    if (this.offset == 0) {
      this.listElements = [];
      this.isLoading = false;
    }
    $.ajax({
      type: "GET",
      url: this.listUrl + "&offset=" + this.offset + "&size=" + this.size,
      success: function(es, textStatus, request) {
        this.listElements = this.listElements.concat(es.data);
        this.isLoading = false;
      }.bind(this),
      error: function(request, textStatus, errorThrown) {}
    });
  }
}

var sessionStore = new SessionStore();

export default sessionStore;
