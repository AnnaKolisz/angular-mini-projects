import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/model/data';
import { DataService } from 'src/app/service/data.service';

@Component({
    selector: 'am-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {

  list$: Observable<Project[]>;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.list$ = this.dataService.getProjects();
  }

}
