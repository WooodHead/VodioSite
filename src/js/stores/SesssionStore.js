import { observable } from "mobx";

class SessionStore {
  @observable session = null;
  @observable showLogin = false;
  @observable showFooter = true;
  @observable history = null;
}

var sessionStore = new SessionStore;

export default sessionStore;
