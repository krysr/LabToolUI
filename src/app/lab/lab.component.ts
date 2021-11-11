import {Component, OnInit, ViewChild} from '@angular/core';
import {Lab, Demo, Grade} from "./lab";
import {LabService} from "./lab.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {StudentService} from "../student/student.service";
import {Router} from "@angular/router";
import {GradeComponent} from "../grade/grade.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {

  studentGrade: Grade = new Grade();
  testString: boolean;
  todaysDate: string;
  currentTime: number;
  currentHour: string;
  currentMinutes: any;
  todaysLabs: Lab[];
  labs: Lab[];
  currentLab: Lab;
  nextLabs: Lab[];
  nextLab: Lab;
  demoTable: MatTableDataSource<Demo>;
  displayedColumns: string[];
  isDemo: boolean = false;
  role: string;
  currentStudentDemo: Demo;
  assessmentName: string;
  grade: number;
  gradeComment: string;
  lab: Lab;
  gradeDate: Date;



  @ViewChild(MatSort) sort: MatSort;

  constructor(private labService: LabService, private studentService: StudentService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.testString = false;
    this.isDemo = false;

    this.labService.getLab().subscribe((data) => {
      this.labs = data;
      this.labs.sort((a, b) => (a.labDay < b.labDay ? -1 : 1));

      setInterval(() => {
        this.getDate();
        this.getTodaysLabs();
     }, 1000);
    });


  }

  getDate() {
    switch (new Date().getDay()) {
      case 1:
        this.todaysDate = "Monday";
        break;
      case 2:
        this.todaysDate = "Tuesday";
        break;
      case 3:
        this.todaysDate = "Wednesday";
        break;
      case 4:
        this.todaysDate = "Thursday";
        break;
      case 5:
        this.todaysDate = "Friday";
        break;
    }
    this.currentHour = new Date().getHours().toString();
    this.currentMinutes = new Date().getMinutes() < 10 ? '0' : '';
    this.currentTime = +(this.currentHour.concat(this.currentMinutes.concat(new Date().getMinutes().toString())));
  }

  getTodaysLabs() {
    this.todaysLabs = [];
    this.nextLabs = [];
    this.labs.forEach( (element) => {
      if (element.labDay === this.todaysDate) {
        this.todaysLabs.push(element);
      }
    });
    this.getNextLabs();
  }

  getNextLabs() {
    this.todaysLabs.forEach( (element) => {
     // this.labTime = +(element.labDay.replace(':', ''));
      if( this.currentTime >= element.startTime && this.currentTime <= element.endTime) {
        this.currentLab = element;
      }
      else if (this.currentTime < element.startTime) {
        this.nextLabs.push(element);
        this.nextLabs.sort((n1 ,n2) => n1.startTime - n2.startTime);
        this.nextLab = this.nextLabs[0];
        // console.log(this.nextLabs + " next one " + this.nextLab);
      }
    });
    this.showQueue();
  }

  demonstrate() {
    //this.personlab = this.currentLab.personlab;
    // @ts-ignore
    //this.personlab.student.username = localStorage.getItem('username').toString();
    this.role = localStorage.getItem('role').toString();
    this.isDemo = true;
    this.displayedColumns = ["num", "person.firstName", "person.lastName", "button"];
    this.labService.addDemonstrate(this.currentLab).subscribe((data) => {
      // this.demoTable = new MatTableDataSource(data);
      //   this.demoTable.sort = this.sort;
    });
      //this.showQueue();
    //   .subscribe((data) => {
    //   console.log(data);
    //   this.demoTable = new MatTableDataSource(data);
    //   this.demoTable.sort = this.sort;
    //   // this.demoTable = data;
    // });
  }

  stopDemo() {
    this.isDemo = false;
    this.labService.removeDemonstrate(this.currentLab).subscribe((data) => {

    });
    // .subscribe((data) => {
    //   this.demoTable = new MatTableDataSource(data);
    //   this.demoTable.sort = this.sort;
    // });
  }

  showQueue() {
    // @ts-ignore
    this.role = localStorage.getItem('role').toString();
    this.displayedColumns = ["num", "person.firstName", "person.lastName", "button"];
   // if(this.role === 'lecturer' || this.role === 'demonstrator' || this.isDemo) {
      //this.isDemo = true;
      this.labService.getQueue(this.currentLab).subscribe((data) => {
        // console.log("in queue");
        data.forEach( demo => {
          if(demo.person.dsUsername === localStorage.getItem('username') || this.role === 'lecturer' || this.role === 'demonstrator') {
            this.isDemo = true;
            this.demoTable = new MatTableDataSource(data);
            this.demoTable.sort = this.sort;
           // this.currentStudentDemo =
              //this.demoTable.get()
          }
        })
      });
   // }
  }

  goToGrade(row: Demo) {

    console.log(row.person, row.lab, row.demoId);
    this.currentStudentDemo = row;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "600px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      row
    };
    // const modalDialog = this.dialog.open(GradeComponent, dialogConfig);

    this.testString = true;
   // console.log("row " + this.currentStudentDemo.person.dsUsername);


    const dialogRef = this.dialog.open(GradeComponent, {
      width: '600px',
      height: '600px',
      data : {demo: row}
      // data: {name: this.assessmentName, grade: this.grade, comment: this.gradeComment, lab: this.lab},
    });

    dialogRef.afterClosed().subscribe(result => {
      let studentDate = new Date();
      // this.gradeDate =this.datepipe.transform(this.gradeDate, 'DD-MM-YYYY');

      console.log("result is "+result.grade + " " + result.comment);
      this.studentGrade.grade = result.grade;
      this.studentGrade.gradeComment = result.comment;
      this.studentGrade.gradeDate = studentDate;
      this.studentGrade.demo = row;
      if(!!this.studentGrade) {
        this.labService.addGrade(this.studentGrade).subscribe((data) => {
          console.log(data);
        });
      }
    });



  }

}
