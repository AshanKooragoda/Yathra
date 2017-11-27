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

  showSubDetails: boolean;      // subject is selected, now show details in the box
  showSubjectAdd: boolean;      // adding subject to the teacher
  addNewSubject: boolean;       // adding a new subject to the teacher
  subjectBoxMsg: string;        // title of the subject box

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

  loadTeacherList() {                           // load teacher name list for given subject
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

  loadDetails(username) {                             // load details of the selected teacher (teacher details, subjects, class table)
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
        this.addNewSubject = false;
        this.showSubDetails = false;
        this.showSubjectAdd = false;
      },                                                          // class table part is not implemented
      error => {
        console.log(error);
      }
    );
  }

  subjectDetails(subject) {                 // appear gray box for subject details and adding new subject
    if (subject === 'new') {
      this.subjectBoxMsg = 'Select Subject';
      this.showSubDetails = false;
      this.showSubjectAdd = !this.showSubjectAdd;
    }else {
      this.subjectBoxMsg = 'Subject details';
      this.showSubjectAdd = false;
      this.addNewSubject = false;
      if (subject === this.curSubject) {
        this.showSubDetails = !this.showSubDetails;
      }else {
        this.showSubDetails = true;
        this.curSubject = subject;
      }
    }
  }

  addSubject() {                    // when the 'Add new Subject' checkbox clicks
    if (this.addNewSubject) {
      this.addNewSubject = false;
      this.subjectBoxMsg = 'Select subject';
    }else {
      this.addNewSubject = true;
      this.subjectBoxMsg = 'New subject';
    }
  }

  removeSubject() {           // remove selected curSubject from teacher
    // check whether the subject is used for classes by given teacher
  }

  selectSubjectToTeacher() {    // add selected subject to the teacher
    // add New Subject to teacher
  }

  newSubjetToTeacher() {        // register new subject to system and add it to the teacher
    //
  }
}
