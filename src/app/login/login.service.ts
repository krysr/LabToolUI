import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Login } from './login'
import {config, Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ 'Access-Control-Allow-Origin': 'http://localhost:4200',
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    'Authorization': 'Basic '})
};

@Injectable({providedIn: 'root'})
export class LoginService {
  private auth64: string;// = btoa(this.);
  // head = {
  //   headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
  //     'Authorization': 'Basic '+this.auth64}),
  // };
  // private tokenHeaders = new HttpHeaders({
  //   'Content-Type': 'application/x-www-form-urlencoded',
  //   'Authorization': 'Basic '+this.auth64
  // });

  loginUrl: string;
  constructor(private http: HttpClient) {
    this.loginUrl = 'http://localhost:8080/'
  }

  // public findLogin(username: string, password: string): Observable<Login> {
  //   console.log("in service "+ username);
  //   return this.http.post<Login>(this.loginUrl, username, password);
  // }

  // public findLogin(login: Login): Observable<Login> {
  //   console.log("in service "+ login.dsUsername);
  //   return this.http.post<Login>(this.loginUrl, login, this.head);
  // }

  public findLogin(login: Login): Observable<boolean> {


    this.auth64 = btoa(login.dsUsername + 'x' + login.password)

    const myHeaders = { headers: new HttpHeaders( { 'Access-Control-Allow-Origin': 'http://localhost:4200',
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
      authorization : 'Basic ' + this.auth64})};
   // console.log("in service "+ username);
    return this.http.post<boolean>(this.loginUrl, login, myHeaders);
  }

  getLogin() {
    //return this.http.get<Login>(`${config.apiUrl}/login`);
  }
}
