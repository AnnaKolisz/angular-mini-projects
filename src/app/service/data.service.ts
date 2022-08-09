import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "../model/data";

@Injectable({
    providedIn: 'root'
  })
  export class DataService {
  
    constructor(private http: HttpClient) { }

 
    getData200(): Observable<Employee[]>{
      return this.http.get<Employee[]>('assets/db/mock-data.json');

    }
  }