import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Statistic } from "./statistic";

@Injectable({
  providedIn: 'root'
})

export class StatisticService {
  constructor(private http: HttpClient) {
  }

  /** Adds students stats **/
  addStats(stat: Statistic, role: string): Observable<Statistic[]> {
    return this.http.post<Statistic[]>("http://localhost:8080/stats/" + role, stat);
  }
}
