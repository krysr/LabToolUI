import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {Grade, Lab, Demo, Person} from "./lab";

@Injectable({
  providedIn: 'root'
})
export class LabService {
  username: string | null;
  role: string | null;
  private baseUrl = "http://localhost:8080/lab/";

  constructor(private http: HttpClient) {
  }

  getLab(role: string): Observable<Lab[]> {
    let params = new HttpParams();

    if (localStorage.getItem('username') !== null) {
      // @ts-ignore
      this.username = localStorage.getItem('username').toString();
      params.set('role', role);
    }

    return this.http.get<Lab[]>(this.baseUrl + this.username + "?role=" + role, {params});
  }

  addDemonstrate(lab: Lab): Observable<Demo[]> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
      })
    };
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post<Demo[]>("http://localhost:8080/lab/demonstrate/" + this.username, lab, myHeaders);
  }


  removeDemonstrate(demo: Demo): Observable<Demo[]> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
      })
    };

    return this.http.post<Demo[]>("http://localhost:8080/lab/demonstrate/end/" + this.username, demo, myHeaders);
  }

  getQueue(lab: Lab): Observable<Demo[]> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
      })
    };

    return this.http.post<Demo[]>("http://localhost:8080/lab/demonstrate/", lab, myHeaders);
  }

  addGrade(grade: Grade): Observable<Grade> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
      })
    };
    return this.http.post<Grade>("http://localhost:8080/grade/student/", grade, myHeaders);
  }

  getGrade(username: string, labId: number): Observable<Grade> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
      })
    };
    return this.http.get<Grade>("http://localhost:8080/grade/student/" + username + "/" + labId, myHeaders);
  }

  getName(username: string | null): Observable<Person> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
      })
    };
    return this.http.get<Person>("http://localhost:8080/user/" + username, myHeaders)
  }
}
