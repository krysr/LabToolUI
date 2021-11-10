import {Student} from "../student/student";

export class Lab {
  labid: number;
  labDay: string;
  startTime: number;
  endTime: number;
  labClass: Class;
  // personlabs: Demo
}

export class Class {
  classId: string;
  className: string;
}

export class Grade {
  gradeId: number;
  assessmentName: string;
  grade: number;
  gradeComment: string;
  lab: Lab;
}

export class Demo {
    demoId: number;
    demo: boolean;
    position: number;
    lab: Lab;
    person: Person;
}

export class Person {
  dsUsername: string;
  email: string;
  firstName:string;
  lastName:string;
  userPassword:string;
  roleType:string;
}
