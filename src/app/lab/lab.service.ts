import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {Grade, Lab, PersonLab} from "./lab";

@Injectable({
  providedIn: 'root'
})
export class LabService {
  username: string | null;
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

      params.set('username', this.username);
      // params.set('test', this.test);
    }

// return this.http.get<Student[]>(`${this.baseUrl}`, myHeaders);
    return this.http.get<Lab[]>(this.baseUrl + this.username, {params});
  }

  addDemonstrate(lab: Lab): Observable<PersonLab[]> {
    const myHeaders = { headers: new HttpHeaders( { 'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"})};
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    console.log(lab);
    return this.http.post<PersonLab[]>("http://localhost:8080/lab/demonstrate/"+ this.username, lab, myHeaders);
  }
}
