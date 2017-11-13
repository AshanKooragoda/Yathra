export class User {
  isUserLoggedIn: boolean;
  username: string;
  name: string;
  type: string;

  constructor() {}

  setUserDetail(username, name, type, loggedIn) {
    this.isUserLoggedIn = loggedIn;
    this.username = username;
    this.name = name;
    this.type = type;
  }
}

