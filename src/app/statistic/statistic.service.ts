import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Statistic} from "./statistic";
import {Lab} from "../lab/lab";

@Injectable({
  providedIn: 'root'
})

export class StatisticService {
  constructor(private http: HttpClient) {
  }

  getStats(stat: Statistic): Observable<Statistic[]> {
    const myHeaders = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
      })
    };

    return this.http.post<Statistic[]>("http://localhost:8080/stats/", stat, myHeaders);
  }
}
