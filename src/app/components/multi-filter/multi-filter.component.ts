import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Employee } from 'src/app/model/data';
import { DataService } from 'src/app/service/data.service';
import { COLUMNS, CONFIG_COLUMNS } from 'src/app/service/utility';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'am-multi-filter',
  templateUrl: './multi-filter.component.html',
  styleUrls: ['./multi-filter.component.scss']
})
export class MultiFilterComponent implements OnInit {

  employees: Employee[];
  dataSource: MatTableDataSource<Employee>;
  configColumns = CONFIG_COLUMNS;
  displayedColumns = COLUMNS;
  filteredColums: string[] = [];
  filForm = new FormGroup({});
  sub$: Subscription;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.filteredColums = this.displayedColumns.map(item => `fltr-${item}`)
    const groupForm = this.arrayToFormControls(this.displayedColumns);
    this.filForm = this.formBuilder.group(groupForm);
    this.dataService.getData200().subscribe(
      items => {
        this.employees = items;
        this.dataSource = new MatTableDataSource(this.employees);
      },
      error => { },
      () => {
        this.dataSource.filterPredicate = this.customFilterPredicate();
        this.onChangesFilter();
      })
  }

  ngOnDestroy(){
    if(this.sub$){
      this.sub$.unsubscribe()
    }
  }

  arrayToFormControls(arr: string[]) {
    return arr.reduce((ac, a) => ({ ...ac, [a]: '' }), {});
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: Employee, filter: string): boolean => {
      const searchVal = Object.entries(JSON.parse(filter));
      let check: string[] = [];
      let found: any[] = [];
      for (let [key, value] of searchVal) {
        const val = String(value)
        if (val.length > 0) { check.push(key) }
        const x = (val.length > 0 && data[key].trim().toLowerCase().indexOf(val.toLowerCase()) !== -1);
        found.push(x);
      }
      let founder = found.filter(item => item === true);
      let verify = founder.length === check.length;
      return verify;
    }
    return myFilterPredicate;
  } 
  
  onChangesFilter() {
   this.sub$ = this.filForm.valueChanges.pipe(
    debounceTime(200),
    distinctUntilChanged(),
   ).subscribe((mainValue: any) => {
      this.dataSource.filter = JSON.stringify(mainValue);
    });
 
  }


}


