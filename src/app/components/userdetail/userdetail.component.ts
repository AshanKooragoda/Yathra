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
    this.userService = user;

    this.userDetail = new User();

    console.log(this.route.snapshot.params['id']);

    if (this.route.snapshot.params['id'] === 'new_user') {
      this.message = 'Add new user';
      this.isNew = true;
    }else {
      this.message = 'My profile';
      this.isNew = false;

      this.userDetail.setUserDetail(user.getCurrentUser().username,
        user.getCurrentUser().password,
        user.getCurrentUser().name,
        user.getCurrentUser().type,
        user.getCurrentUser().isUserLoggedIn);

      if (user.getCurrentUser().type === 'teacher') {
        this.isTeacher = true;

        user.queryTeacher({username: user.getCurrentUser().username}).subscribe(
          teachers => {
            console.log(teachers[0]);
            this.teacherDetail = new Teacher();
            this.teacherDetail.setDetails(teachers[0].t_id, teachers[0].username,
              teachers[0].name, teachers[0].contact, teachers[0].address);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  ngOnInit() {
    $('.active').removeClass('active');
    $('#userTab').addClass('active');

    if (!this.isNew) {
      $('#teacher_check').hide();
    }else {
      $('#teacher_check').show();
    }
  }

  specifyTeacher() {
    this.isTeacher = !this.isTeacher;
    this.teacherDetail = new Teacher();
  }

  sumbitDetails() {
    const password = $('#password').val();
    const conf_password = $('#conf_password').val();

    if (this.userDetail.username !== '') {
      if (this.validUsername(this.userDetail.username)) {
        if (this.userDetail.name !== '') {
          if (password !== '') {
              if (password === conf_password) {

              // details

            }else {
              this.message = 'Confimation password is incorrect';
            }
          }else {
            this.message = 'Please provide a none empty password';
          }
        }else {
          this.message = 'Please provide name !';
        }
      }
    }else {
      this.message = 'Please provide username !';
    }
  }

  addUser() {
    const password = $('#password').val();
    const conf_password = $('#conf_password').val();

    if (this.userDetail.username !== '' && this.validUsername(this.userDetail.username)) {
      if (this.userDetail.name !== '') {
        if (password !== '') {
          if (password === conf_password) {

            if (this.isTeacher) {
              if (this.teacherDetail.contact && this.validContact(this.teacherDetail.contact)) {
                this.userService.addTeacherUser({       // update the method to add subjects to the database
                  username: this.userDetail.username,
                  name: this.userDetail.name,
                  password: password,
                  contact: this.teacherDetail.contact,
                  address: this.teacherDetail.address
                }).subscribe(
                  result => {
                    console.log(result);
                  }, error => {
                    console.log(error);
                  }
                );
              }else {
                this.message = 'Please provide contact number';
              }
            }else {
              this.userService.addUser({
                username: this.userDetail.username,
                name: this.userDetail.name,
                password: password
              }).subscribe(
                result => {
                  console.log(result);
                }, error => {
                  console.log(error);
                }
              );
            }

          }else {
            this.message = 'Confimation password is incorrect';
          }
        }else {
          this.message = 'Please provide a none empty password';
        }
      }else {
        this.message = 'Please provide name !';
      }
    }else {
      this.message = 'Please provide username !';
    }
  }

  validContact(contact) {
    return true;      // input contact number of the teacher input and validate it
  }

  validUsername(username) {
    return true;      // input username and check if it's used before
  }
}
