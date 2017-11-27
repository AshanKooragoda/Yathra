import { Injectable, Inject } from '@angular/core';
import {User} from '../models/user';
import {Headers, Http, RequestOptions} from '@angular/http';

@Injectable()
export class TeacherService {
  private http: Http;

  constructor(@Inject(Http) http) {
  this.http = http;
  }

  getSubjects() {           // get all subjecst from database
    return this.http.get('http://localhost:3000/get_subjects').map(res => res.json());
  }

  getTeachers(data) {       // get  teachers according to given subject name
    if (data.subject === 'All') {
      return this.http.get('http://localhost:3000/get_all_teachers').map(res => res.json());
    }else {
      return this.http.post('http://localhost:3000/get_sub_teachers', JSON.stringify(data),
        new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
        .map(res => res.json());
    }
  }

  getTeacherDetails(data) {       // get details and subjects of a teacher from username
    return this.http.post('http://localhost:3000/get_teacher_details', JSON.stringify(data),
      new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})}))
      .map(res => res.json());
  }

}
