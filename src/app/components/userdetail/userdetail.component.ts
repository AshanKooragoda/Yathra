import {Component, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import * as $ from 'jquery';
import {User} from '../../models/user';
import {Teacher} from '../../models/teacher';
import {isUndefined} from 'util';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  isNew: boolean;
  isTeacher: boolean;

  isChangePassword: boolean;   // useful in update user scenario. bind with change password checkbox
  isValidUsername: boolean;    // check if the username is valid
  isValidPassword: boolean;    // check if the provided password matching with given password
  validatedContact: string;       // validated contact

  t_id: string;     // assigned only if user is a teacher (isTeacher is true)

  userService: UserService;

  message: string;      // message when all necessary inputs are not provided

  myData = ['Database systems', 'Numerical methods for system modeling'];
  mySource = ['Database systems', 'Numerical methods for system modeling', 'OOP concepts', 'Signals and systems'];

  constructor(private route: ActivatedRoute, private user: UserService, private router: Router) {
    this.isTeacher = false;
    this.userService = user;

    this.isChangePassword = false;
  }

  ngOnInit() {
    $('.active').removeClass('active');
    $('#userTab').addClass('active');

    if (this.route.snapshot.params['id'] === 'new_user') {
      this.message = 'Add new user';
      this.isNew = true;
      this.isChangePassword = true;
      $('#teacher_check').show();

    }else {
      this.message = 'My profile';
      this.isNew = false;
      this.isValidUsername = true;

      $('#teacher_check').hide();

      $('#username').val(this.userService.getCurrentUser().username);     // set details of current user to the input fields
      $('#name').val(this.userService.getCurrentUser().name);

      if (this.userService.getCurrentUser().type === 'teacher') {         // if current user is a teacher,
        this.isTeacher = true;                                // load teacher specific details to input fields

        this.userService.queryTeacher({username: this.userService.getCurrentUser().username}).subscribe(
          teachers => {
            this.t_id = teachers[0].t_id;
            this.t_id = teachers[0].t_id;
            $('#contact').val(teachers[0].contact);
            $('#address').val(teachers[0].address);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  specifyTeacher() {
    this.isTeacher = !this.isTeacher;
  }

  updatePassword() {
    this.isChangePassword = !this.isChangePassword;
  }

  submitDetails() {
    const username = $('#username').val();
    const name = $('#name').val();
    const password = $('#password').val();
    const conf_password = $('#conf_password').val();

    if (username !== '') {
      if (this.isValidUsername) {
        if (name !== '') {
          if (!this.isChangePassword || (password !== '')) {
            if (!this.isChangePassword || (conf_password !== '')) {
              if (!this.isChangePassword || (password === conf_password)) {
                if (this.isNew) {
                  this.addUser();
                }else {
                  this.updateUser();
                }
              }else {
                this.missingIngredient('conf_password');
              }
            }else {
              this.missingIngredient('conf_password');
            }
          }else {
            this.missingIngredient('password');
          }
        }else {
          this.missingIngredient('name');
        }
      } else {
        this.wrongIngredient('username', 'Username already in use!');   // not missing not valid
      }
    }else {
      this.missingIngredient('username');
    }
  }

  addUser() {
    const username = $('#username').val();
    const name = $('#name').val();
    const password = $('#password').val();

    if (this.isTeacher) {             // still without adding subjects to the teacher
      const contact = $('#contact').val();
      const address = $('#address').val();
      console.log('adding new teacher');

      if (contact !== '') {
        if (this.validContact(contact)) {
          console.log('contact is valid');
          this.userService.addTeacherUser({
            username: username,
            name: name,
            password: password,
            key: username[0],
            contact: contact,
            address: address
          }).subscribe(
            result => {
              console.log(result);
              this.cancel();
            }, error => {
              console.log(error);
            }
          );
        }else {
          this.wrongIngredient('contact', 'Invalid contact provided!');
        }
      }else {
        this.missingIngredient('contact');
      }
    }else {                     // add new user
      this.userService.addUser({
        username: username,
        name: name,
        password: password,
        key: username[0]
      }).subscribe(
        result => {
          console.log(result);
          this.cancel();
        }, error => {
          console.log(error);
        }
      );
    }
  }

  updateUser() {
    const username = $('#username').val();
    const name = $('#name').val();
    const user = this.userService.getCurrentUser();

    if (this.isTeacher) {
      const contact = $('#contact').val();
      const address = $('#address').val();

      if (contact !== '') {
        if (this.validContact(contact)) {

          if (this.isChangePassword) {
            const password = $('#password').val();
            const cur_password = $('#cur_password').val();

            if (cur_password !== '') {
              if (this.isValidPassword) {

                this.userService.updateTeacherPassword({      // update teacher details with passwords (still without subjects)
                  cur_username: user.username,
                  cur_t_id: this.t_id,
                  username: username,
                  name: name,
                  password: password,
                  key: username[0],
                  contact: contact,
                  address: address
                }).subscribe(
                  result => {
                    console.log(result);
                    this.cancel();
                  }, error => {
                    console.log(error);
                  }
                );
              }else {
                this.wrongIngredient('cur_password', 'Incorrect password provided!');
              }
            }else {
              this.missingIngredient('cur_password');
            }
          }else {
            this.userService.updateTeacher({      // update teacher details without passwords (still without subjects)
              cur_username: user.username,
              cur_t_id: this.t_id,
              username: username,
              name: name,
              contact: contact,
              address: address
            }).subscribe(
              result => {
                console.log(result);
                this.cancel();
              }, error => {
                console.log(error);
              }
            );
          }

        }else {
          this.wrongIngredient('contact', 'Invalid contact provided!');
        }
      }else {
        this.missingIngredient('contact');
      }

    }else {
      if (this.isChangePassword) {
        const password = $('#password').val();
        const cur_password = $('#cur_password').val();

        if (cur_password !== '') {
          if (this.isValidPassword) {
            this.userService.updateUserPassword({      // update user details with password change
              cur_username: user.username,
              username: username,
              name: name,
              password: password,
              key: username[0]
            }).subscribe(
              result => {
                console.log(result);
                this.cancel();
              }, error => {
                console.log(error);
              }
            );
          }else {
            this.wrongIngredient('cur_password', 'Incorrect password provided!');
          }
        }else {
          this.missingIngredient('cur_password');
        }
      }else {
        this.userService.updateUser({      // update user details without password change
          cur_username: user.username,
          username: username,
          name: name,
        }).subscribe(
          result => {
            console.log(result);
            this.cancel();
          }, error => {
            console.log(error);
          }
        );
      }
    }
  }

  missingIngredient(element) {
    this.message = 'Missing valid input for ' + element;
    $('input').removeClass('warningFont');
    $('#' + element).addClass('warningFont');
    $('#' + element).focus();
  }

  wrongIngredient(element, msg) {
    this.message = msg;
    $('input').removeClass('warningFont');
    $('#' + element).addClass('warningFont');
    $('#' + element).focus();
  }

  validContact(contact) {             // check whether the given input is a contact and format is to correct formats
    let number =  contact.trim().split(' ').join('');
    if (number[0] === '+') {
      number = number.substr(1);
    }
    if (number.match(/^\d+$/)) {
      if ((number.substr(0, 2) === '94') && (number.length === 11)) {
        this.validatedContact = '+94' + number.substr(2, 4) + number.substr(4, 7) + number.substr(7);
        return true;
      }else if (number[0] === '0' && number.length === 10) {
        this.validatedContact = '+94' + number.substr(1, 3) + number.substr(3, 6) + number.substr(6);
        return true;
      }else if (number[0] !== '0' && number.length === 9) {
        this.validatedContact = '+94' + number.substr(0, 2) + number.substr(2, 5) + number.substr(5);
        return true;
      }else {
        return false;
      }
    }else {
      return false;
    }
  }

  validUsername() {
    const username = $('#username').val();
    if (!this.isNew && (username === this.userService.getCurrentUser().username)) {
      console.log('check one');
      this.isValidUsername = true;
    }
    this.userService.checkUsername({username: username})
      .subscribe(
      result => {
        if (result[0].available === 'false') {
          this.isValidUsername = true;
        }else {
          this.isValidUsername = false;
        }
      }, error => {
        console.log(error);
      }
    );
  }

  validPassword() {         // check whether given password is the current password of this user
    const password = $('#cur_password').val();
    const username = this.userService.getCurrentUser().username;

    this.userService.checkPassword({username: username, password: password, key: username[0]})
      .subscribe(
        result => {
          if (result[0].matching === 'true') {
            this.isValidPassword = true;
          }else {
            this.isValidPassword = false;
          }
        }, error => {
          this.isValidPassword = false;
          console.log(error);
        }
      );
  }

  cancel () {
    this.router.navigate(['user']);
  }
}

