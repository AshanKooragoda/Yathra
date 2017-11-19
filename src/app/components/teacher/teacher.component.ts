import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {TeacherService} from '../../services/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  // editable: boolean;
  subjects: any[];

  // create service called teacherService
  // dont use teacher name attribute in DB schema
  // try to remove name attribute in teacher table


  constructor(private teacherService: TeacherService) {
    this.loadSubjects();                  // to load subjects to the select element
    // this.editable = false;
  }

  ngOnInit() {
    $('.active').removeClass('active');
    $('#teacherTab').addClass('active');
  }

  loadSubjects() {              // load subject to the select element
    this.teacherService.getSubjects().subscribe(
      subjects => {
        this.subjects = subjects;
      },
      error => {
        console.log(error);
      }
    );
  }

  loadTeacherList() {
    const subject = $('#select_subject').val();
    this.teacherService.getTeachers({subject: subject}).subscribe(
      teachers => {
        console.log( teachers);
      },
      error => {
        console.log(error);
      }
    );
    ;
  }

}
