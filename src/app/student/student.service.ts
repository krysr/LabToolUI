import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  username: string | null;
  private baseUrl = "http://localhost:8080/student/";
  test: string = "test";
  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student>{
    let params = new HttpParams();

    const myHeaders = { headers: new HttpHeaders( { 'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"})};
    if (localStorage.getItem('username') !== null) {
      // @ts-ignore
      this.username = localStorage.getItem('username').toString();

      params.set('username', this.username);
      // params.set('test', this.test);
    }

    // return this.http.get<Student[]>(`${this.baseUrl}`, myHeaders);
    return this.http.get<Student>(this.baseUrl+this.username, {params});
  }
}
