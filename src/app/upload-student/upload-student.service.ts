import {Observable} from "rxjs";
import {Class, Demo, Lab} from "../lab/lab";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Statistic} from "../statistic/statistic";

@Injectable({
  providedIn: 'root'
})
export class UploadStudentService {
  username: string | null;
  role: string | null;
  private baseUrl = "http://localhost:8080/lab/";

  constructor(private http: HttpClient) {
  }

  uploadList(result: string[], lab: Lab) {
    const myHeaders = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
      })
    };
    return this.http.post<any>("http://localhost:8080/lab/list/" + lab.labId, result, myHeaders).toPromise().then(response => {
      console.log(response);
    })
  }

  assignToLab(lab: Lab, email: string, type: string) {
    const myHeaders = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
      })
    };
    // return this.http.post<Demo[]>("http://localhost:8080/lab/assign/" + {username}, lab, myHeaders);
    return this.http.post<any>("http://localhost:8080/lab/assign/" + email +'/'+ type, lab, myHeaders).toPromise().then(response => {
      console.log(response);
    })
  }

  addNewLab(lab: Lab, labClass: Class, username: string | null){
    const myHeaders = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
      })
    };
  this.addNewClass(labClass);
    return this.http.post<any>("http://localhost:8080/lab/add/" + username, lab, myHeaders).toPromise().then(response => {
      console.log(response);
    })
    // this.http.post("http://localhost:8080/lab/list/", lab, myHeaders);
}

   addNewClass(labClass: Class): any {
     const myHeaders = {
       headers: new HttpHeaders({
         'Access-Control-Allow-Origin': 'http://localhost:4200',
         "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
       })
     };
     return this.http.post<any>("http://localhost:8080/class/add", labClass, myHeaders).toPromise().then(response => {
       console.log(response);
     })
     // this.http.post("http://localhost:8080/class/add", labClass, myHeaders);
   }

   getStats(): Observable<Statistic[]> {
     const myHeaders = {
       headers: new HttpHeaders({
         'Access-Control-Allow-Origin': 'http://localhost:4200',
         "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
       })
     };
     return this.http.get<Statistic[]>("http://localhost:8080/stats/");
   }
   }
