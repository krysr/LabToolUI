import {Observable} from "rxjs";
import {Demo} from "../lab/lab";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UploadStudentService {
  username: string | null;
  role: string | null;
  private baseUrl = "http://localhost:8080/lab/";

  constructor(private http: HttpClient) {
  }

  uploadList(result: object, selectRole: string): Observable<Demo[]> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
      })
    };
    return this.http.post<Demo[]>("http://localhost:8080/lab/list/" + {selectRole}, result, myHeaders);
  }
}
