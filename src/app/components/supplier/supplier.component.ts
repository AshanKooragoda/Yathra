import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  editable: boolean;

  constructor() {
    this.editable = false;
  }

  ngOnInit() {
    $('.active').removeClass('active');
    $('#supplierTab').addClass('active');
  }

  editDetails() {
    this.editable = ! this.editable;
  }

  saveDetails() {
    this.editable = ! this.editable;
  }

}
