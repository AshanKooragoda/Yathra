import { Injectable, Inject } from '@angular/core';
import {User} from '../models/user';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';

@Injectable()
export class UserService {

  private currentUser: User;
  private http: Http;

  constructor(private router: Router, @Inject(Http) http) {
    this.currentUser = new User();
    this.http = http;
  }

  getCurrentUser() {
    return this.currentUser;
  }
  setCurrentUser(user) {
    this.currentUser = user;
  }

  queryUser(data) {         // get user details according to username and password
    return this.http.post('http://localhost:3000/get_user', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  queryUsers(data) {        // get every user of a particular type
    if (data === 'teacher') {
      return this.http.get('http://localhost:3000/get_teachers').map(res => res.json());
    }else if (data === 'admin') {
      return this.http.get('http://localhost:3000/get_admins').map(res => res.json());
    }else {
      return this.http.get('http://localhost:3000/get_users').map(res => res.json());
    }
  }

  queryUserDetail(data) {      // get user details from username ( doesn't include password for this details)
    return this.http.post('http://localhost:3000/get_user_detail', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  queryTeacher(data) {
    return this.http.post('http://localhost:3000/get_user_teacher', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  addTeacherUser(data) {
    console.log(data);
    return this.http.post('http://localhost:3000/add_user_teacher', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

  addUser(data) {
    console.log(data);
    return this.http.post('http://localhost:3000/add_user', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

}
