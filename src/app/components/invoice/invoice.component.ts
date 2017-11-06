import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor( private router: Router) {

  }

  ngOnInit() {
    $('.active').removeClass('active');
    $('#invoiceTab').addClass('active');
  }

  goToInvoice() {
    const invoice_no = 'I0012';
    this.router.navigate(['invoice/' + invoice_no]);
  }
}
