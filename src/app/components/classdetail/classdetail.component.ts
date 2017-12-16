import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClassService} from '../../services/class.service';
import {TeacherService} from '../../services/teacher.service';

@Component({
  selector: 'app-classdetail',
  templateUrl: './classdetail.component.html',
  styleUrls: ['./classdetail.component.css']
})
export class ClassdetailComponent implements OnInit {

  subjects: any[];          // list of subjects to dropdown select element
  teachers: any[];          // list of teacher names to dropdown select element

  constructor(private route: ActivatedRoute, private classService: ClassService, private teacherService: TeacherService) {

    //load teacher list
    //after that load curClass details to fields

    this.teacherService.getSubjects().subscribe(
      (res1) => {
        this.subjects = res1;
        const subject = res1[0].s_no;
        this.teacherService.getTeachers({subject: subject}).subscribe(
          (res2) => {
            this.teachers = res2;
            if (this.route.snapshot.params['no'] !== 'new_class') {
              const curClass = this.classService.curClass;
              console.log(curClass);
              $('#select_subject select').val(curClass['s_no']);
            }
          },
          err2 => {
            console.log(err2);
          }
        );
      },
      (err1) => {
        console.log(err1);
      }
    );


  }

  ngOnInit() {
  }

  loadTeacherList() {                           // load teacher name list for given subject no
    const subject = $('#select_subject').val();
    this.teacherService.getTeachers({subject: subject}).subscribe(
      (result) => {
        this.teachers = result;
      },
      error => {
        console.log(error);
      }
    );
  }

}
