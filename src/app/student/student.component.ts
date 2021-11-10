import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service'
import { Student } from './student'
import {Router} from "@angular/router";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  firstName: string;
  isDemonstrator: boolean;
  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.studentService.getStudent().subscribe((data) => {
      this.firstName = data.firstName;
      this.isDemonstrator = data.role.toLowerCase() === 'demonstrator';
    });
  }
}
