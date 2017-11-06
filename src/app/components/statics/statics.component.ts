import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.css']
})
export class StaticsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.active').removeClass('active');
    $('#staticsTab').addClass('active');
  }

}
