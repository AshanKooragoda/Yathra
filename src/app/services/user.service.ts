import { Injectable, Inject } from '@angular/core';
import {User} from '../models/user';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';

@Injectable()
export class UserService {

  private currentUser: User;
  private http: Http;

  constructor(private router: Router, @Inject(Http) http) {
    this.currentUser = new User(null, null, null, false);
    this.http = http;
  }

  getCurrentUser() {
    return this.currentUser;
  }
  setCurrentUser(user) {
    this.currentUser = user;
  }

  queryUser(data) {
    return this.http.post('http://localhost:3000/get_user', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  queryUsers() {
    return this.http.post('http://localhost/back_End/controllers/user.php/',
      {'type': 'get_*_users'})
      .map(res => res.json());
  }

  queryUsername(usernameInfo) {
    return this.http.post('http://localhost/back_End/controllers/user.php/', usernameInfo)
      .map(res => res.json());
  }

}
