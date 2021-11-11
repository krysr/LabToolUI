import {Component, Inject, Input, OnInit} from '@angular/core';
import {Demo, Grade} from "../lab/lab";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {

  // @Input() studentDemo: Demo; //: Demo;
  // @Input() test: boolean; //: Demo;

  loginForm: FormGroup;
  grade: number;
  gradeComment: string;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<GradeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {demo: Demo}) { }

  ngOnInit(): void {
    console.log("dialoggg " + this.data.demo.person.firstName.toString());
    this.loginForm = this.formBuilder.group({
      // assessmentName: ['', Validators.required],
      grade: ['', Validators.required],
      gradeComment: ['', Validators.required]
    });
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  actionFunction() {
    alert("You have logged out.");
    this.onNoClick();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  onNoClick() {
    console.log("you clicled close");
    this.grade = this.loginForm.controls.grade.value;
    this.gradeComment = this.loginForm.controls.gradeComment.value;
    this.dialogRef.close({grade: this.grade, comment: this.gradeComment});
  }

}
