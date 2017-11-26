import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {TeacherService} from '../../services/teacher.service';
import {isUndefined} from 'util';
import {Teacher} from '../../models/teacher';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  subjects: any[];          // subjects for select subject dropdown menu
  teachers: any[];          // teachers for list of buttons with teacher's usernames

  curTeacher: Teacher;      // selected one from list of teachers
  curSubject: any;          // selected subject from set of labels for a specific teacher
  showSubDetails: boolean;  // subject is selected, now show details in the box

  // dont use teacher name attribute in DB schema
  // try to remove name attribute in teacher table

  constructor(private teacherService: TeacherService) {
    this.curTeacher = new Teacher();
  }

  ngOnInit() {
    $('.active').removeClass('active');
    $('#teacherTab').addClass('active');

    this.loadSubjects();                  // load subject to dropdown at initial time
  }

  loadSubjects() {                        // load subject to the select element
    this.teacherService.getSubjects().subscribe(
      subjects => {
        this.subjects = subjects;
        if (isUndefined(this.teachers)) {       // teachers for selected subject is  loaded for initial time
          this.loadTeacherList();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  loadTeacherList() {           // load teacher name list for given subject
    const subject = $('#select_subject').val();
    this.teacherService.getTeachers({subject: subject}).subscribe(
      teachers => {
        this.teachers = teachers;
        console.log(this.curTeacher.username);
        if (isUndefined(this.curTeacher.username)) {         // for the initial time
          this.loadDetails(teachers[0].username);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  loadDetails(username) {
    $('.list-group-item').removeClass('active');
    $('#' + username).addClass('active');

    this.teacherService.getTeacherDetails({username: username}).subscribe(
      details => {
        this.curTeacher.setDetails(
          details[0][0].t_id,
          details[0][0].username,
          details[0][0].fullname,
          details[0][0].contact,
          details[0][0].address);
        this.curTeacher.setSubjects(details[1]);
      },
      error => {
        console.log(error);
      }
    );
  }

  subjectDetails(subject) {
    alert(subject.s_no);
    this.curSubject = subject;
    this.showSubDetails = true;
  }

}
