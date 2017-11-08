import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-expance',
  templateUrl: './expance.component.html',
  styleUrls: ['./expance.component.css']
})
export class ExpanceComponent implements OnInit {
  editable: boolean;

  constructor() {
    this.editable = false;
  }

  ngOnInit() {
    $('.active').removeClass('active');
    $('#expenseTab').addClass('active');
  }

  showNew() {
    this.editable = ! this.editable;
  }

}

