import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Employee, EmployeeAddress, Project } from "../model/data";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  getData200(): Observable<Employee[]> {
    return this.http.get<Employee[]>('assets/db/mock-data.json');
  }

  getData1000(): Observable<Employee[]> {
    return this.http.get<Employee[]>('assets/db/mock-data-1000.json');
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('assets/db/projects.json');
  }

  getDataForAddress(): Observable<EmployeeAddress[]> {
    return this.http.get<EmployeeAddress[]>('assets/db/mock-address.json');
  }

}