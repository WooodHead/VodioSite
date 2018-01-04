import { observable } from "mobx";

class SessionStore {
  @observable session = "";
  @observable showLogin = false;
  @observable showFooter = true;
}

var sessionStore = new SessionStore;

export default sessionStore;
