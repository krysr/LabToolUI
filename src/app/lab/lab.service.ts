import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {Grade, Lab, Demo} from "./lab";

@Injectable({
  providedIn: 'root'
})
export class LabService {
  username: string | null;
  role: string | null;
  private baseUrl = "http://localhost:8080/lab/";
  constructor(private http: HttpClient) { }

  getLab(): Observable<Lab[]> {
    let params = new HttpParams();

    const myHeaders = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
      })
    };
    if (localStorage.getItem('username') !== null) {
      // @ts-ignore
      this.username = localStorage.getItem('username').toString();
      // @ts-ignore
      this.role = localStorage.getItem('role').toString();

      params.set('role', this.role);
      // params.set('test', this.test);
    }

// return this.http.get<Student[]>(`${this.baseUrl}`, myHeaders);
    return this.http.get<Lab[]>(this.baseUrl + this.username + "?role="+this.role, {params});
  }

  addDemonstrate(lab: Lab): Observable<Demo[]> {
    const myHeaders = { headers: new HttpHeaders( { 'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"})};
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
       return this.http.post<Demo[]>("http://localhost:8080/lab/demonstrate/"+ this.username, lab, myHeaders);
  }

  // addDemonstrate(lab: Lab) {
  //   const myHeaders = { headers: new HttpHeaders( { 'Access-Control-Allow-Origin': 'http://localhost:4200',
  //       "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"})};
  //   const headers = new Headers({
  //     'Content-Type': 'application/json'
  //   });
  //   console.log(lab);
  //   this.http.post<PersonLab[]>("http://localhost:8080/lab/demonstrate/"+ this.username, lab, myHeaders);
  // }

  removeDemonstrate(lab: Lab): Observable<Demo[]> {
    const myHeaders = { headers: new HttpHeaders( { 'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"})};
  // return this.http.post<PersonLab[]>("http://localhost:8080/lab/demonstrate/end/"+ this.username, lab, myHeaders);
   return this.http.post<Demo[]>("http://localhost:8080/lab/demonstrate/end/"+ this.username, lab, myHeaders);
  }

  getQueue(lab: Lab): Observable<Demo[]> {
    const myHeaders = { headers: new HttpHeaders( { 'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"})};
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post<Demo[]>("http://localhost:8080/lab/demonstrate/", lab, myHeaders);
  }
}
