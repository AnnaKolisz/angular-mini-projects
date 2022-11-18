import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/model/data';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
   
  list$: Observable<Project[]>;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.list$ = this.dataService.getProjects();
  }

}
