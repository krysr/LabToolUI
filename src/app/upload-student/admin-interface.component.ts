import {Component, Input, OnInit, ViewChild} from '@angular/core';
import * as XLSX from 'ts-xlsx';
import {Class, Lab, Grade} from "../lab/lab";
import {LabService} from "../lab/lab.service";
import {AdminInterfaceService} from "./admin-interface.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StatCollection, Statistic} from "../statistic/statistic";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ChartOptions, ChartDataSets, ChartType} from 'chart.js';
import {Label, Color} from "ng2-charts";

@Component({
  selector: 'app-upload-student',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.css']
})
export class AdminInterfaceComponent implements OnInit {

  @Input() selectedIndex: number | null;

  fileToUpload: File;
  arrayBuffer: any;
  displayedColumns: string[];
  gradeCol: string[];
  avgDemoFooter: string[];
  labForm: FormGroup;
  studentForm: FormGroup;
  lab: Lab;
  email: string;
  class: Class;
  labList: Lab[]
  statTable: MatTableDataSource<StatCollection>;
  gradeTable: MatTableDataSource<Grade>;
  stats: Statistic[];
  grades: Grade[];
  filteredStats: Statistic[];
  displayStats: StatCollection[];
  labDate: string[];
  gradeDate: string[];
  avgWaitStr: string;
  avgDemoStr: string;
  firstName: string;
  isGraph: boolean;
  demoGraph: Map<number, number> = new Map();
  waitGraph: Map<number, number> = new Map();

  // Graph data below

  /** Queue graph **/
  waitLineChartData: ChartDataSets[] = [
    {data: [], label: 'Waiting Time By Number Of Students'},
  ];

  waitLineChartLabels: Label[];
  waitLineChartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      fullWidth: true,
      fontSize: 30,
      text: 'Waiting Time By Number Of Students'
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Number of Students',
          fontSize: 20,
        },
        ticks: {
          fontSize: 30,
          stepSize: 1,
          beginAtZero: true
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Minutes',
          fontSize: 20,
        },
        ticks: {
          fontSize: 25
        }
      }],
    }
  };

  waitLineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#7CE7FA',
    },
  ];

  /** Demo graph **/
  demoLineChartData: ChartDataSets[] = [
    {data: [], label: 'Demonstration Time By Number Of Students'},
  ];

  demoLineChartLabels: Label[];

  demoLineChartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      fullWidth: true,
      fontSize: 30,
      text: 'Demonstration Time By Number Of Students'
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Number of Students',
          fontSize: 20,
        },
        ticks: {
          fontSize: 30,
          stepSize: 1,
          beginAtZero: true
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Minutes',
          fontSize: 20,
        },
        ticks: {
          fontSize: 25
        }
      }],
    }
  };

  demoLineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#0b5697',
    },
  ];

  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';


  @ViewChild(MatSort) sort: MatSort;

  constructor(private adminInterfaceService: AdminInterfaceService,
              private formBuilder: FormBuilder,
              private labService: LabService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.labService.getName(localStorage.getItem('username')).subscribe((data) => {
      this.firstName = data.firstName;
    })
    this.getLabs();
    this.labForm = this.formBuilder.group({
      labDay: ['', Validators.required],
      classId: ['', Validators.required],
      className: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      room: ['', Validators.required],
    });

    this.studentForm = this.formBuilder.group({
      email: ['', Validators.required],
      lab: ['', Validators.required]
    })
  }

  getLabs(): void {
    this.labService.getLab('lecturer').subscribe((data) => {
      this.labList = data;
      this.sortLabs(this.labList);
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

  /** Source: https://stackoverflow.com/questions/47151035/angular-4-how-to-read-data-from-excel by: Prabhu Anand **/
  incomingfile(event: Event) {
    // @ts-ignore
    this.fileToUpload = event.target.files[0];
  }

  /** Source: https://stackoverflow.com/questions/47151035/angular-4-how-to-read-data-from-excel by: Prabhu Anand **/
  fileUpload() {
    this.lab = new Lab();
    let result;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type: "binary"});
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      result = XLSX.utils.sheet_to_csv(worksheet);
      let final_result = result.split('\n');
      this.lab = this.studentForm.controls.lab.value;
      if (!!result) {
        this.adminInterfaceService.uploadList(final_result, this.lab).then(
          res => {
            this.snackBar.open('Upload successful!', 'Close', {
              duration: 10000,
              panelClass: ['success-snackbar']
            });
            this.studentForm.reset();
          }).catch(res =>
          console.log("Sorry, something went wrong")
        );
      }
    }
    fileReader.readAsArrayBuffer(this.fileToUpload);
  }

  formUpload(type: string) {
    this.lab = this.studentForm.controls.lab.value;
    this.email = this.studentForm.controls.email.value;
    this.adminInterfaceService.assignToLab(this.lab, this.email, type).then(
      res => {
        this.snackBar.open('Upload successful!', 'Close', {
          duration: 10000,
          panelClass: ['success-snackbar']
        });
        this.studentForm.reset();
      }).catch(res =>
      console.log("Sorry, something went wrong")
    );
  }

  labOnSubmit() {
    let username: string | null = localStorage.getItem('username');
    this.class = new Class();
    this.lab = new Lab();
    this.class.classId = this.labForm.controls.classId.value;
    this.class.className = this.labForm.controls.className.value;
    this.lab.labDay = this.labForm.controls.labDay.value;
    this.lab.startTime = this.labForm.controls.startTime.value.replace(':', '');
    this.lab.endTime = this.labForm.controls.endTime.value.replace(':', '');
    this.lab.room = this.labForm.controls.room.value;
    this.lab.labClass = this.class;

    this.adminInterfaceService.addNewLab(this.lab, this.class, username).then(res => {
      this.snackBar.open('Lab created!', 'Close', {
        duration: 10000,
        panelClass: ['success-snackbar']
      });
    });
  }

  filterLabs(lab: Lab, event: any, choice: number) {
    if (event.isUserInput) {
      this.demoGraph = new Map();
      this.demoGraph.set(0, 0);
      this.waitGraph = new Map();
      this.waitGraph.set(0, 0);
      this.displayStats = [];
      this.avgDemoStr = '';
      this.avgWaitStr = '';
      this.statTable = new MatTableDataSource(this.displayStats);
      this.stats = [];
      this.labDate = [];
      this.gradeDate = [];
      if (1) {
        this.adminInterfaceService.getStats().subscribe((data) => {
          this.stats = data.filter(obj => obj.demo.lab.labId === lab.labId);
          this.stats.forEach(obj => {
            this.labDate.push(new Date(obj.date).toDateString() + " " + obj.demo.lab.startTime);
            this.labDate = this.labDate.filter((v, i, a) => a.indexOf(v) === i);
          })
        })
      }
      if (2) {
        this.grades = [];
        this.adminInterfaceService.getGrades().subscribe((data) => {
          this.grades = data.filter(obj => obj.demo.lab.labId === lab.labId);
          this.grades.forEach(obj => {
            this.gradeDate.push(new Date(obj.gradeDate).toDateString() + " " + obj.demo.lab.startTime);
            this.gradeDate = this.gradeDate.filter((v, i, a) => a.indexOf(v) === i);
          })
        })
      }

    }
  }

  getLabStats(date: string, event: any) {
    if (event.isUserInput) {
      this.displayStats = [];
      this.filteredStats = [];
      this.displayedColumns = ["Student", "JoinTime", "WaitingTime", "TotalDemo"];
      this.avgDemoFooter = ['avgDemoHeader', 'avgDemo'];
      this.filteredStats = this.stats.filter(obj => new Date(obj.date).toDateString() === date.slice(0, 15));
      this.getAverage(this.filteredStats);
      this.filteredStats.forEach(key => {
        let myStats = new StatCollection;
        let formatJoinTime = this.msToTime(new Date(key.joinTime).getTime(), false, 2);
        let demoTime = this.msToTime(new Date(key.demoEndTime).getTime() - new Date(key.demoStartTime).getTime(), true, 0);
        let waitingTime = this.msToTime(new Date(key.demoStartTime).getTime() - new Date(key.joinTime).getTime(), true, 1);
        myStats.demo = key.demo;
        myStats.date = key.date;
        myStats.joinTime = formatJoinTime;
        myStats.demoTime = demoTime;
        myStats.waitingTime = waitingTime;
        this.displayStats.push(myStats);
      })
      this.statTable = new MatTableDataSource(this.displayStats);
      this.statTable.sort = this.sort;
    }
  }

  getAverage(filtered: Statistic[]) {
    let averageWait: number = 0;
    let averageDemo: number = 0;
    filtered.forEach(val => {
      averageWait += new Date(val.demoStartTime).getTime() - new Date(val.joinTime).getTime();
      averageDemo += new Date(val.demoEndTime).getTime() - new Date(val.demoStartTime).getTime();
    })
    this.avgWaitStr = this.msToTime(averageWait / filtered.length, false, 2);
    this.avgDemoStr = this.msToTime(averageDemo / filtered.length, false, 2);
  }
 /** Source: https://stackoverflow.com/questions/19700283/how-to-convert-time-in-milliseconds-to-hours-min-sec-format-in-javascript by: Dusht**/
  msToTime(time: number, forGraph: boolean, option: number) {
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    let hoursStr = (hours < 10) ? "0" + hours : hours;
    let minutesStr = (minutes < 10) ? "0" + minutes : minutes.toString();
    let secondsStr = (seconds < 10) ? "0" + seconds : seconds;

    if (forGraph) {
      let newMinute: string;
      if (minutesStr.charAt(0) === '0') {
        newMinute = minutesStr.substring(1);
      } else {
        newMinute = minutesStr;
      }
      if (option === 1) {
        if (hoursStr === '01' || hoursStr === '02') {
          this.waitGraph.set(60, 0);
        }
        if (this.waitGraph.has(Number(newMinute))) {
          // @ts-ignore
          this.waitGraph.set(Number(newMinute), this.waitGraph.get(Number(newMinute)) + 1);
        }
        else {
          this.waitGraph.set(Number(newMinute), 1);
        }
        this.waitGraph = new Map([...this.waitGraph].sort((a, b) => {return a[0] -b[0]}));
        this.waitLineChartLabels = Array.from(this.waitGraph.keys()) as unknown as Label[];
        this.waitLineChartData = [
          {data: Array.from(this.waitGraph.values()), label: 'Demonstration Time By Number Of Students'},
        ];
      }
      else if (option === 0) {
        if (hoursStr === '01' || hoursStr === '02') {
          this.demoGraph.set(60, 0);
        }
        if (this.demoGraph.has(Number(newMinute))) {
          // @ts-ignore
          this.demoGraph.set(Number(newMinute), this.demoGraph.get(Number(newMinute)) + 1);
        }
        else {
          this.demoGraph.set(Number(newMinute), 1);
        }
        this.demoGraph = new Map([...this.demoGraph].sort((a, b) => {return a[0] -b[0]}));

        this.demoLineChartLabels = Array.from(this.demoGraph.keys()) as unknown as Label[];
        this.demoLineChartData = [
          {data: Array.from(this.demoGraph.values()), label: 'Waiting Time By Number Of Students'},
        ];
      }
    }
    return hoursStr + ":" + minutesStr + ":" + secondsStr;
  }

  showGraph(graph: boolean) {
    this.isGraph = graph;
  }

  getStudentsGrades(date: string, event: any) {

    if (event.isUserInput) {
      this.grades = this.grades.filter(obj => new Date(obj.gradeDate).toDateString() === date.slice(0, 15));
      this.gradeCol = ["FirstName", "LastName", "Grade", "Comment"];
      this.gradeTable = new MatTableDataSource(this.grades);
      this.gradeTable.sort = this.sort;
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
