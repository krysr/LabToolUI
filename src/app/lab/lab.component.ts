import {Component, OnInit, ViewChild} from '@angular/core';
import {Lab, Demo, Grade, Person} from "./lab";
import {LabService} from "./lab.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {GradeComponent} from "../grade/grade.component";
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
  demoQueue: Demo[];
  studentGrade: Grade = new Grade();
  testString: boolean;
  todaysDate: string;
  currentTime: number;
  currentHour: string;
  currentMinutes: any;
  todaysLabs: Lab[];
  labs: Lab[];
  user: Person;
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
  demoStartTime: Date;
  demoEndTime: Date;
  waitingTime: number;
  joinQueue: Date;
  interHandle: any;
  firstName: string;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private labService: LabService, private statService: StatisticService, private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.isAccepted = false;
    this.pageLoaded = false;
    this.username = localStorage.getItem('username');
    // @ts-ignore
    this.role = localStorage.getItem('role');
    this.isDemo = false;

    this.labService.getLab(this.role).subscribe((data) => {
      this.pageLoaded = true;
      this.labs = data;
      this.sortLabs(this.labs);
      this.getName();
      this.interHandle = setInterval(() => {
        this.getDate();
        this.getTodaysLabs();
      }, 2000);
    });
  }

  getName() {
    this.labService.getName(this.username).subscribe((data) => {
      this.user = data;
      this.firstName = data.firstName;
    })
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
      case 0:
        this.todaysDate = "Sunday";
        break;
      case 6:
        this.todaysDate = "Saturday";
        break;
    }
    this.currentHour = new Date().getHours().toString();
    this.currentMinutes = new Date().getMinutes() < 10 ? '0' : '';
    this.currentTime = +(this.currentHour.concat(this.currentMinutes.concat(new Date().getMinutes().toString())));
  }

  getTodaysLabs() {
    this.todaysLabs = [];
    this.nextLabs = [];
    this.labs.forEach((element) => {
      if (element.labDay === this.todaysDate) {
        this.todaysLabs.push(element);
      }
    });
    this.getNextLabs();
  }

  getNextLabs() {
    if (this.todaysLabs.length === 0) {
      this.currentLab = new Lab();
    }
    this.todaysLabs.forEach((element) => {
      if (this.currentTime >= element.startTime && this.currentTime <= element.endTime) {
        this.currentLab = element;
      } else if (this.currentTime < element.startTime) {
        this.nextLabs.push(element);
        this.nextLabs.sort((n1, n2) => n1.startTime - n2.startTime);
        this.nextLab = this.nextLabs[0];
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
    // @ts-ignore
    this.role = localStorage.getItem('role').toString();
    this.displayedColumns = ["num", "person.firstName", "person.lastName", "instructorBtn", "liveDemo", "exit"];
    if (!!this.currentLab) {
      this.labService.getQueue(this.currentLab).subscribe((data) => {
        data.forEach(demo => {
          this.demoQueue = data.filter(obj => obj.demo !== 'done');
          if (demo.demo !== 'done' && demo.person.dsUsername === localStorage.getItem('username') || this.role === 'lecturer' || this.role === 'demonstrator') {
            this.isDemo = true;
            this.demoTable = new MatTableDataSource(this.demoQueue);
            this.demoTable.sort = this.sort;
            this.isFirstPos = this.demoTable.data.find(x => x.demo === 'yes');
          }
          if (demo.person.dsUsername === this.username && demo.demo === "yes" && this.joinQueue === undefined) {
            this.joinQueue = new Date();
            this.addStats(demo);
          }
          this.getGrade(this.username);
        })
      });
    }
  }

  toggleTable(showQueue: boolean) {
    if (showQueue) {
      this.interHandle = setInterval(() => {
        this.getDate();
        this.getTodaysLabs();
      }, 2000);
    } else {
      this.isDemo = false;
      clearInterval(this.interHandle);
    }
  }

  addGrade(row: Demo) {
    this.demoEndTime = new Date();
    this.currentStudentDemo = row;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "600px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      row
    };
    this.testString = true;
    const dialogRef = this.dialog.open(GradeComponent, {
      width: '600px',
      height: '600px',
      data: {demo: row}
    });

    dialogRef.afterClosed().subscribe(result => {
      let studentDate = new Date();
      this.studentGrade.grade = result.grade;
      this.studentGrade.gradeComment = result.comment;
      this.studentGrade.gradeDate = studentDate;
      this.studentGrade.demo = row;
      this.isAvailable = true;
      if (!!this.studentGrade) {
        this.labService.addGrade(this.studentGrade).subscribe((data) => {
        });
      }
    });
    this.addStats(row);
  }

  getGrade(username: string | null) {
    // @ts-ignore
    this.labService.getGrade(username, this.currentLab.labId).subscribe((data) => {
      if (!!data && new Date(data.gradeDate).getDay() === new Date().getDay() && new Date(data.gradeDate).getMonth() === new Date().getMonth()) {
        this.isGradeSet = true;
        this.studentGrades = data;
        this.isDemo = false;
      }
    });
  }

  acceptStudent(row: Demo) {
    this.demoStartTime = new Date();
    this.waitingTime = (new Date).getTime();
    this.currentStudentDemo = row;
    this.studentName = this.currentStudentDemo.person.dsUsername;
    this.isAvailable = false;
    row.demo = 'live';
    this.labService.removeDemonstrate(row).subscribe((data) => {
    });
  }

  startTimer(inDemo: boolean) {
    this.isAccepted = true;
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

  addStats(demo: Demo) {
    let stats: Statistic = new Statistic;
    stats.demo = demo;
    if (this.role === 'student') {
      stats.joinTime = this.joinQueue;
      stats.date = new Date();
      this.statService.addStats(stats, this.role).subscribe((data) => {

      });
    } else {
      stats.demoStartTime = this.demoStartTime;
      stats.demoEndTime = this.demoEndTime;
      stats.date = new Date();
      this.statService.addStats(stats, this.role).subscribe((data) => {
      });
    }

  }

  switchInterface(role: string) {
    localStorage.setItem('role', role);
    clearInterval(this.interHandle);
    this.labService.getLab(role).subscribe((data) => {
      this.labs = data;
      this.labs.sort((a, b) => (a.labDay < b.labDay ? -1 : 1));
      this.interHandle = setInterval(() => {
        this.getDate();
        this.getTodaysLabs();
      }, 2000);
    });
  }

  sortLabs(labs: Lab[]) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    labs.sort((lab1, lab2) => (days.indexOf(lab1.labDay) < days.indexOf(lab2.labDay) ? -1 : 1));
    labs.sort((lab1, lab2) => lab1.labDay !== lab2.labDay ? 1 : this.sortByTime(lab1.startTime, lab2.startTime));
  }

  sortByTime(lab1: number, lab2: number) {
    return lab1 < lab2 ? -1 : 1;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
