import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Employee } from '../model/data';
import { DataService } from '../service/data.service';
import { CONFIG_COLUMNS, COLUMNS } from '../service/utility';

@Component({
  selector: 'app-multi-filter',
  templateUrl: './multi-filter.component.html',
  styleUrls: ['./multi-filter.component.scss']
})
export class MultiFilterComponent implements OnInit {

  employees: Employee[];
  employees$: Observable<Employee[]>;
  dataSource: any;
  configColumns = CONFIG_COLUMNS;
  displayedColumns = COLUMNS;
  filteredColums = COLUMNS;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {

    this.employees$ = this.dataService.getData200();
    this.dataService.getData200().subscribe(items => {
      this.employees = items;
      this.dataSource = new MatTableDataSource(this.employees);
    })
  }


}
