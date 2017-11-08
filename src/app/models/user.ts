export class User {
  isUserLoggedIn: boolean;
  username: string;
  password: string;
  name: string;
  type: string;

  constructor() {}

  setUserDetail(username, password, name, type, loggedIn) {
    this.isUserLoggedIn = loggedIn;
    this.username = username;
    this.name = name;
    this.password = password;
    this.type = type;
  }

  // getUsername() {
  //   return this.username;
  // }
  // getPassword() {
  //   return this.password;
  // }
  // getName() {
  //   return this.name;
  // }
  // isUserloggedIn() {
  //   return this.isUserLoggedIn;
  // }
  //
  // setUserloggedIn(loggedIn) {
  //   this.isUserLoggedIn = loggedIn;
  // }
}

