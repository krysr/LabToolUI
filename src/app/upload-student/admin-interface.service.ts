import { Observable } from "rxjs";
import {Class, Grade, Lab} from "../lab/lab";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Statistic } from "../statistic/statistic";

@Injectable({
  providedIn: 'root'
})
export class AdminInterfaceService {
  username: string | null;

  constructor(private http: HttpClient) {
  }

  /** Adds students to lab request **/
  uploadList(result: string[], lab: Lab) {
    return this.http.post<any>("http://localhost:8080/lab/list/" + lab.labId, result).toPromise().then(response => {
      console.log(response);
    })
  }

  /** Assignes demonstrator to lab request **/
  assignToLab(lab: Lab, email: string, type: string) {
    return this.http.post<any>("http://localhost:8080/lab/assign/" + email + '/' + type, lab).toPromise().then(response => {
      console.log(response);
    })
  }

  /** Creates new lab request  **/
  addNewLab(lab: Lab, labClass: Class, username: string | null) {
    this.addNewClass(labClass);
    return this.http.post<any>("http://localhost:8080/lab/add/" + username, lab).toPromise().then(response => {
      console.log(response);
    })
  }

  /** Creates new class request  **/
  addNewClass(labClass: Class): any {
    return this.http.post<any>("http://localhost:8080/class/add", labClass).toPromise().then(response => {
      console.log(response);
    })
  }

  /** Gets all stats request  **/
  getStats(): Observable<Statistic[]> {
    return this.http.get<Statistic[]>("http://localhost:8080/stats/");
  }

  /** Gets all grades request  **/
  getGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>("http://localhost:8080/grade/gradeslist/");
  }
}
