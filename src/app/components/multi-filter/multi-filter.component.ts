import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/model/data';
import { DataService } from 'src/app/service/data.service';
import { COLUMNS, CONFIG_COLUMNS } from 'src/app/service/utility';


@Component({
  selector: 'am-multi-filter',
  templateUrl: './multi-filter.component.html',
  styleUrls: ['./multi-filter.component.scss']
})
export class MultiFilterComponent implements OnInit {

  employees: Employee[];
  employees$: Observable<Employee[]>;
  dataSource: any;
  configColumns = CONFIG_COLUMNS;
  displayedColumns = COLUMNS;
  filteredColums: string[] = [];
  filForm = new FormGroup({});

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.filteredColums = this.displayedColumns.map(item => `fltr-${item}`)
    const groupForm = this.arrayToFormControls(this.displayedColumns);
    this.filForm = this.formBuilder.group(groupForm);
    console.log(this.filForm);
    this.employees$ = this.dataService.getData200();
    this.dataService.getData200().subscribe(items => {
      this.employees = items;
      this.dataSource = new MatTableDataSource(this.employees);
      try {
        this.dataSource.filterPredicate = this.customFilterPredicate();
      } catch (e) {
        console.error('error with filter predicate ');
      }
    })
  }

  arrayToFormControls(arr: string[]) {
    return arr.reduce((ac, a) => ({ ...ac, [a]: '' }), {});
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: any, filter: string): boolean => {
      console.log(this.dataSource);
      const searchString = JSON.parse(filter);
      let check: string[] = [];
      let found: any[] = [];
      for (let [key, value] of searchString) {
        if (value.length > 0) { check.push(key) }
        const x = value.length > 0 && data[key].trim().toLowerCase().indexOf(value.toLowerCase()) !== -1;
        found.push(x);
      }
      let founder = found.filter(item => item === true);
      let verify = founder.length === check.length;
      return verify;
    }
    return myFilterPredicate;
  }


}
