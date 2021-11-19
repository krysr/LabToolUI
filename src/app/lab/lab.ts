import {Student} from "../student/student";

export class Lab {
  labId: number;
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
  gradeDate: Date;
  grade: number;
  gradeComment: string;
  demo: Demo;
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
