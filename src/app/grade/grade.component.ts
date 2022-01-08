import {Component, Inject, OnInit} from '@angular/core';
import {Demo} from "../lab/lab";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {

  loginForm: FormGroup;
  grade: number;
  gradeComment: string;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<GradeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {demo: Demo}) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      grade: ['', Validators.required],
      gradeComment: ['', Validators.required]
    });
  }

  submitGrade() {
    this.grade = this.loginForm.controls.grade.value;
    this.gradeComment = this.loginForm.controls.gradeComment.value;
    this.dialogRef.close({grade: this.grade, comment: this.gradeComment});
  }

}
