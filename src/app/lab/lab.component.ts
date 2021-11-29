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
import {StatisticService} from "../statistic/statistic.service";
import {Statistic} from "../statistic/statistic";

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {

  username: string | null;
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
  grade: number;
  lab: Lab;
  studentGrades: Grade;
  isGradeSet: boolean;
  pageLoaded: boolean;
  isAccepted: boolean;
  mm = 0;
  ss = 0;
  ms = 0;
  isRunning = false;
  timerId = 0;
  isFirstPos: Demo | undefined;
  studentName: string;
  isAvailable: boolean = true;
  startTime: Date;
  endTime: Date;
  waitingTime: number;
  joinQueue: Date;



  @ViewChild(MatSort) sort: MatSort;

  constructor(private labService: LabService, private statService: StatisticService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isAccepted = false;
    this.pageLoaded = false;
    this.username = localStorage.getItem('username');
    this.testString = false;
    this.isDemo = false;

    this.labService.getLab().subscribe((data) => {
      this.pageLoaded = true;
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
        this.todaysDate = "monday";
        break;
      case 2:
        this.todaysDate = "tuesday";
        break;
      case 3:
        this.todaysDate = "wednesday";
        break;
      case 4:
        this.todaysDate = "thursday";
        break;
      case 5:
        this.todaysDate = "friday";
        break;
      case 0:
        this.todaysDate = "sunday";
        break;
      case 6:
        this.todaysDate = "saturday";
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
    // @ts-ignore
    this.role = localStorage.getItem('role').toString();
    this.isDemo = true;
    this.displayedColumns = ["num", "person.firstName", "person.lastName", "button"];
    this.labService.addDemonstrate(this.currentLab).subscribe((data) => {
    });
    this.startTimer(false);
  }

  stopDemo(row: Demo) {
    row.demo = 'no';
    this.isDemo = false;
    this.labService.removeDemonstrate(row).subscribe((data) => {
    });
    this.startTimer(false);
  }

  showQueue() {

    let found = false;
    // @ts-ignore
    this.role = localStorage.getItem('role').toString();
    this.displayedColumns = ["num", "person.firstName", "person.lastName", "instructorBtn", "liveDemo"];
   // if(this.role === 'lecturer' || this.role === 'demonstrator' || this.isDemo) {
      //this.isDemo = true;
    if (!!this.currentLab) {
      this.labService.getQueue(this.currentLab).subscribe((data) => {
        // console.log("in queue");
        data.forEach(demo => {
          if (demo.person.dsUsername === localStorage.getItem('username') || this.role === 'lecturer' || this.role === 'demonstrator') {
            found = true;
            this.isDemo = true;
            this.demoTable = new MatTableDataSource(data);
            this.demoTable.sort = this.sort;
            this.isFirstPos = this.demoTable.data.find(x => x.demo === 'yes');
            if(demo.person.dsUsername === this.username && demo.demo === "live" && this.startTime === null) {
              this.startTime = new Date();
              this.currentStudentDemo = demo;
              this.waitingTime = this.startTime.getTime() - this.joinQueue.getTime();
              //this.startTimer(true);
            }
          }
        })
        if (!found) {
          this.isDemo = false;
        }
      });
      this.getGrade(this.username);
    }

   // }
  }

  addGrade(row: Demo) {

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
      this.isAvailable = false;
      if(!!this.studentGrade) {
        this.labService.addGrade(this.studentGrade).subscribe((data) => {
          console.log(data);
          // this.isAccepted = false;
          // this.startTimer();
        });
      }
    });
  }

  getGrade(username: string | null) {
    // @ts-ignore
    this.labService.getGrade(username, this.currentLab.labId).subscribe((data) => {
      if(!!data) {
        this.isGradeSet = true;
        this.studentGrades = data;
        if (this.endTime === null) {
          this.endTime = new Date();
          //this.waitingTime = this.endTime.getTime() - this.startTime.getTime();
        }
      }
    });
    let stats: Statistic = new Statistic;
    stats.demo = this.currentStudentDemo;
    stats.waitingTime = this.waitingTime;
    stats.demoStartTime = this.startTime;
    stats.demoEndTime = this.endTime;
    stats.date = new Date();

    this.statService.getStats(stats).subscribe((data) => {

    });

  }

  acceptStudent(row: Demo) {
    this.currentStudentDemo = row;
    this.studentName = this.currentStudentDemo.person.dsUsername;
    this.isAvailable = false;
    row.demo = 'live';
    this.labService.removeDemonstrate(row).subscribe((data) => {
    });
  }

  startTimer(inDemo: boolean) {
    this.isAccepted = true;
    if(!inDemo) {

    }

    this.joinQueue = new Date();

    if (!this.isRunning) {
      this.timerId = setInterval(() => {
        this.ms++;

        if (this.ms >= 100) {
          this.ss++;
          this.ms = 0;
        }
        if (this.ss >= 60) {
          this.mm++;
          this.ss = 0
        }
      }, 10);
    } else {
      clearInterval(this.timerId);
      this.ss = 0;
      this.mm = 0;
      this.ms = 0;
    }
    this.isRunning = !this.isRunning;
  }

  format(num: number) {
    return (num + '').length === 1 ? '0' + num : num + '';
  }

}
