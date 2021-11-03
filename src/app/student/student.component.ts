import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service'
import { Student } from './student'

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: Student[];
  firstName: string;
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data) => {
      console.log(data);
      this.firstName = data.firstName;
      //this.students = data;
    });
  }
}
