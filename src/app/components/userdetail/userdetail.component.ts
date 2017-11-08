import {Component, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import * as $ from 'jquery';
import {User} from '../../models/user';
import {Teacher} from '../../models/teacher';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  isNew: boolean;
  isTeacher: boolean;

  userDetail: User;
  teacherDetail: Teacher;

  userService: UserService;

  message: string;      // message when all necessary inputs are not provided

  myData = ['Database systems', 'Numerical methods for system modeling'];
  mySource = ['Database systems', 'Numerical methods for system modeling', 'OOP concepts', 'Signals and systems'];

  constructor(private route: ActivatedRoute, private user: UserService, private router: Router) {
    this.isTeacher = false;
    console.log(this.route.snapshot.params['id']);
    if (this.route.snapshot.params['id'] === 'new_user') {
      $('#teacher_check').hide();
      this.isNew = true;
      this.userDetail = new User();
    }else {
      this.isNew = false;
      $('#teacher_check').hide();
      if (user.getCurrentUser().type === 'Teacher') {
        this.isTeacher = true;
      }
    }
  }

  ngOnInit() {
    $('.active').removeClass('active');
    $('#userTab').addClass('active');
  }

  addTeacher() {
    this.isTeacher = !this.isTeacher;
    this.teacherDetail = new Teacher();
  }

  addUser() {


    // const password = $('#confirm_password').val();
    // let usernameInfo = {};
    // let queryInfo = {};
    //
    // if (this.userDetail.username !== '') {
    //   if (this.userDetail.name !== '') {
    //     if (this.userDetail.password === password) {
    //       if ((password !== '') && (this.userDetail.password !== '')) {
    //         if (this.isTeacher) {
    //           queryInfo = {'type': '_', 'username': this.userDetail.username, 'name': this.userDetail.name,
    //             'password': this.userDetail.password, 't_id': '_',
    //             'contact': this.teacherDetail.contact, 'address': this.teacherDetail.address, 'subjects': this.myData};
    //           if (this.newuser) {
    //             usernameInfo = {'type': 'get_username', 'username': this.userDetail.username};
    //             queryInfo['type'] = 'add_teacher';
    //             queryInfo['t_id'] = 'new_id';
    //           }else {
    //             usernameInfo = {'type': 'get_username', 'username': this.userDetail.username,
    //               'previous': this.user.getCurrentUser().username};
    //             queryInfo['type'] = 'update_teacher';
    //             queryInfo['t_id'] = this.teacherDetail.t_id;
    //           }
    //         }else {
    //           queryInfo = {'type': '_', 'username': this.userDetail.username, 'name': this.userDetail.name,
    //             'password': this.userDetail.password};
    //           if (this.newuser) {
    //             usernameInfo = {'type': 'get_username', 'username': this.userDetail.username};
    //             queryInfo['type'] = 'add_admin';
    //           }else {
    //             usernameInfo = {'type': 'get_username', 'username': this.userDetail.username,
    //               'previous': this.user.getCurrentUser().username};
    //             queryInfo['type'] = 'update_admin';
    //           }
    //         }
    //         // this.user.queryUsername(usernameInfo).subscribe(
    //           // names => {
    //           //   this. = users;
    //           // },
    //           // error => {
    //           //   console.log(error);
    //           // }
    //       }else {
    //         alert('password cannot be empty');
    //       }
    //     }else {
    //       alert('confirm your password');
    //     }
    //   }else {
    //     alert('provide name');
    //   }
    // }else {
    //   alert('provide username');
    // }
  }
}
