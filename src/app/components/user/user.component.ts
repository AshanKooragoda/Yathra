import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import * as $ from 'jquery';
import {User} from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  users: any[];
  teacher: boolean;       // to load the userlist. represent the values of checkboxes
  admin: boolean;
  userService: UserService;
  selectedUser: User;     // to keep data of the

  constructor(private router: Router, private user: UserService) {
    this.teacher = true;
    this.admin = true;
    this.userService = user;
  }

  ngOnInit() {
    $('.active').removeClass('active');
    $('#userTab').addClass('active');

    this.getUsers();
  }

  goToProfile(name) {
    this.router.navigate(['user/' + name]);
  }

  getUsers() {        // load user list according to the checkboxes (admins and teachers)
    let type = 'any';
    if (!this.admin && this.teacher) {
      type = 'teacher';
    }else if (this.admin && !this.teacher) {
      type = 'admin';
    }else if (!this.admin && !this.teacher) {
      this.users = [];
      return;
    }
    // console.log('admin' + this.admin + ' + teacher' + this.teacher);
    this.user.queryUsers(type).subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.log(error);
      }
    );
  }

  loadUserDetail(username) {
    $('.list-group .active').removeClass('active');
    $('#' + username + '_user').addClass('active');
    this.user.queryUserDetail({username: username}).subscribe(
      users => {
        console.log(users[0].username);
        for (let u of users) {
          console.log(u);
        }
        this.selectedUser = users[0];
      },
      error => {
        console.log(error);
      }
    );
  }
}
