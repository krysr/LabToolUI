import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Login } from './login'
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class LoginService {

  private auth64: string;
  loginUrl: string;

  constructor(private http: HttpClient) {
    this.loginUrl = 'http://localhost:8080/'
  }

  public findLogin(login: Login): Observable<Login> {
    this.auth64 = btoa(login.dsUsername + ':' + login.password)
    const myHeaders = { headers: new HttpHeaders( { 'Access-Control-Allow-Origin': 'http://localhost:4200',
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
      authorization : 'Basic ' + this.auth64})};

    return this.http.post<Login>(this.loginUrl, null, myHeaders);
  }
}
