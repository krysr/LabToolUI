import {Lab, Demo} from "../lab/lab";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabService {
  username: string | null;
  private baseUrl = "http://localhost:8080/lab/";

  constructor(private http: HttpClient) {
  }
}
