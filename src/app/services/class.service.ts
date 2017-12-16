import { Injectable, Inject } from '@angular/core';
import {User} from '../models/user';
import {Headers, Http, RequestOptions} from '@angular/http';

@Injectable()
export class ClassService {
  private http: Http;
  curClass: object;

  constructor(@Inject(Http) http) {
    this.http = http;
  }

  getTeachers() {           // get all subjecst from database
    return this.http.get('http://localhost:3000/get_teacher_names').map(res => res.json());
  }

  getClasses(data) {            // get list of class details by matching teacher id and day
    return this.http.post('http://localhost:3000/get_class_list', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

}
