import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Grade, Lab, Demo, Person } from "./lab";

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
    return this.http.post<Demo[]>("http://localhost:8080/lab/demonstrate/" + this.username, lab);
  }

  removeDemonstrate(demo: Demo): Observable<Demo[]> {
    return this.http.post<Demo[]>("http://localhost:8080/lab/demonstrate/end/" + demo.person.dsUsername, demo);
  }

  getQueue(lab: Lab): Observable<Demo[]> {
    return this.http.post<Demo[]>("http://localhost:8080/lab/demonstrate/", lab);
  }

  addGrade(grade: Grade) {
    return this.http.post<any>("http://localhost:8080/grade/student/", grade).toPromise().then(response => {
      console.log(response);
    });
  }

  getGrade(username: string, labId: number): Observable<Grade> {
    return this.http.get<Grade>("http://localhost:8080/grade/student/" + username + "/" + labId);
  }

  getName(username: string | null): Observable<Person> {
    return this.http.get<Person>("http://localhost:8080/user/" + username)
  }
}
