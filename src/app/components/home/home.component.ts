import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string;

  constructor(private user: UserService, private router: Router) {
    this.username = user.getCurrentUser().username;
  }

  ngOnInit() {  }

  loadMenu(tabName) {
    this.router.navigate([tabName]);
  }

}
