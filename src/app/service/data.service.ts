import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Employee, Project } from "../model/data";

@Injectable({
    providedIn: 'root'
  })
  export class DataService {
  
    constructor(private http: HttpClient) { }

 
    getData200(): Observable<Employee[]>{
      return this.http.get<Employee[]>('assets/db/mock-data.json');
    }

    getProjects(): Observable<Project[]>{
      return this.http.get<Project[]>('assets/db/projects.json');
    }
  }