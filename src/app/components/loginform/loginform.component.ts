import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  userService: UserService;
  message: string;

  constructor(private router: Router, private user: UserService, private route: ActivatedRoute) {
    this.userService = user;
    this.message = 'Welcome Back';
  }

  onSubmit(username, password) {
    const data = {
      username: username,
      password: password
    };
    this.userService.queryUser(data)
      .subscribe(res => {
        console.log(res);
      }, error => {
        console.log(error);
      });
  }

  ngOnInit() {
  }

}
