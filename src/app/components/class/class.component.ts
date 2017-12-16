import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {ClassService} from '../../services/class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  teachers: any[];          // list of teachers. to filter the class detail table
  classes: any[];           // list of classes for the table


  constructor( private router: Router, private classService: ClassService) {

    // load teacher list array || cannot add more teachers to the system while in this tab. loaded only once.
    this.classService.getTeachers().subscribe(
      (result) => {
        this.teachers = result;
        this.loadClassList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    $('.active').removeClass('active');
    $('#classTab').addClass('active');
  }

  goToClass() {
    const c_no = 'I0012';
    this.router.navigate(['class/' + c_no]);
  }

  loadClassList() {
    const day = $('#select_day').val();
    const t_id = $('#select_teacher').val();
    this.classService.getClasses({day: day, t_id: t_id}).subscribe(
      (result) => {
        this.classes = result;
      },
      (error) => {
        console.log(error);
      }
    );
    // subscribe
  }
}
