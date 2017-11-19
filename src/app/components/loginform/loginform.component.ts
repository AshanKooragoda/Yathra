import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';

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

    console.log(document.cookie);
  }

  onSubmit(username, password) {
    const data = {
      username: username,
      password: password,
      key: username[0]
    };
    this.userService.queryUser(data)
      .subscribe(res => {
        if (res.length === 0) {
          this.message = 'Try Again...';
        }else {
          const user  = new User();
          let type = 'teacher';
          if (res[0].t_id == null) {
            type = 'admin';
          }
          user.setUserDetail(res[0].username, res[0].name, type, true);
          this.userService.setCurrentUser(user);
          console.log(this.userService.getCurrentUser());       // just for implementation details
          this.router.navigate(['invoice']);
        }
      }, error => {
        console.log(error);
      });
  }


  ngOnInit() {
    console.log(document.cookie);
  }

}
