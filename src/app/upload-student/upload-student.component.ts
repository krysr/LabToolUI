import {Component, Input, OnInit, ViewChild} from '@angular/core';
import * as XLSX from 'ts-xlsx';
import {Class, Demo, Lab} from "../lab/lab";
import {LabService} from "../lab/lab.service";
import {UploadStudentService} from "./upload-student.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StatCollection, Statistic} from "../statistic/statistic";

@Component({
  selector: 'app-upload-student',
  templateUrl: './upload-student.component.html',
  styleUrls: ['./upload-student.component.css']
})
export class UploadStudentComponent implements OnInit {

  fileToUpload: File;
  arrayBuffer: any;
  demoTable: MatTableDataSource<Demo>;
  displayedColumns: string[];
  avgDemoFooter: string[];
  dateColumn: string;
  selectRole: string;
  labForm: FormGroup;
  studentForm: FormGroup;
  lab: Lab;
  email: string;
  class: Class;
  labList: Lab[]
  statTable: MatTableDataSource<StatCollection>;
  stats: Statistic[];
  filteredStats: Statistic[];
  displayStats: StatCollection[];
  groupByColumn: string = 'date';
  labDate: string[];
  avgWaitStr: string;
  avgDemoStr: string;
  successMsg: boolean = false;


  @ViewChild(MatSort) sort: MatSort;

  constructor(private uploadStudentService: UploadStudentService, private formBuilder: FormBuilder, private labService: LabService) {
  }

  ngOnInit(): void {
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

  handleFileInput(files: FileList) {
    // this.fileToUpload = files.item(0);
    // this.file= event.target.files[0];
  }

  getLabs(): void {
    this.labService.getLab().subscribe((data) => {
      this.labList = data;
      //this.labs.sort((a, b) => (a.labDay < b.labDay ? -1 : 1));
    });
  }

  incomingfile(event: Event) {
    // @ts-ignore
    this.fileToUpload = event.target.files[0];
  }

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
      result = XLSX.utils.sheet_to_json(worksheet, {raw: true});
      console.log(XLSX.utils.sheet_to_json(worksheet, {raw: true}));
      console.log(result[0]);
      this.lab = this.studentForm.controls.lab.value;
      // this.displayedColumns = ["person.email", "lab.class.classId", "lab.startTime", "lab.endTime"];
      if (!!result) {
        this.uploadStudentService.uploadList(result, this.lab).subscribe((data) => {
          // this.demoTable = new MatTableDataSource(data);
          // this.demoTable.sort = this.sort;
        });
      }
      console.log("type " + typeof (result));
    }
    fileReader.readAsArrayBuffer(this.fileToUpload);
  }

  formUpload() {
    this.lab = this.studentForm.controls.lab.value;
    this.email = this.studentForm.controls.email.value;
    this.uploadStudentService.assignToLab(this.lab, this.email).then(
      res => {
        this.successMsg = true;
        this.studentForm.reset();
      }).catch( res =>
        console.log("sorry something went wrong")
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

    this.uploadStudentService.addNewLab(this.lab, this.class, username);
  }

  filterLabs(lab: Lab, event: any) {
    if (event.isUserInput) {
      this.displayStats = [];
      this.avgDemoStr = '';
      this.avgWaitStr = '';
      this.statTable = new MatTableDataSource(this.displayStats);
      this.stats = [];
      this.labDate = [];
      this.uploadStudentService.getStats().subscribe((data) => {
        this.stats = data.filter(obj => obj.demo.lab.labId === lab.labId);
        this.stats.forEach(obj => {
          this.labDate.push(new Date(obj.date).toDateString() + " " + obj.demo.lab.startTime);
          this.labDate = this.labDate.filter((v, i, a) => a.indexOf(v) === i);
        })
      })
    }
  }

  getLabStats(date: string, event: any) {
    if (event.isUserInput) {
      this.displayStats = [];
      this.filteredStats = [];
      this.groupByColumn = "Date";
      this.displayedColumns = ["Student", "JoinTime", "WaitingTime", "TotalDemo"];
      this.avgDemoFooter = ['avgDemoHeader', 'avgDemo'];
      this.filteredStats = this.stats.filter(obj => new Date(obj.date).toDateString() === date.slice(0, 15));
      this.getAverage(this.filteredStats);
      this.filteredStats.forEach(key => {
        let myStats = new StatCollection;
        let formatJoinTime = this.msToTime(new Date(key.joinTime).getTime());
        let demoTime = this.msToTime(new Date(key.demoEndTime).getTime() - new Date(key.demoStartTime).getTime());
        let waitingTime = this.msToTime(new Date(key.demoStartTime).getTime() - new Date(key.joinTime).getTime());
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
    this.avgWaitStr = this.msToTime(averageWait/filtered.length);
    this.avgDemoStr = this.msToTime(averageDemo/filtered.length);
  }

  msToTime(time: number) {
    let milliseconds = Math.floor((time % 1000) / 100);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    let hoursStr = (hours < 10) ? "0" + hours : hours;
    let minutesStr = (minutes < 10) ? "0" + minutes : minutes;
    let secondsStr = (seconds < 10) ? "0" + seconds : seconds;

    return hoursStr + ":" + minutesStr + ":" + secondsStr;

  }
}