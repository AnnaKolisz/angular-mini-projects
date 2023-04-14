import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigTable, Employee } from 'src/app/model/data';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'am-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent implements OnInit {

  data$: Observable<Employee[]>;
  headers = ["firstName", "lastName", "company", "department"]
  config = [
    { key: 'firstName', title: 'First Name' },
    { key: 'lastName', title: 'LastName' },
    { key: 'company',  title: 'Company'},
    { key: 'department', title: 'Department' },

  ]; 

  
  constructor(
    private dataService: DataService,
  ) { }


  ngOnInit(): void {

    this.data$ = this.dataService.getData1000();
  //  this.dataService.getData200().subscribe(list => this.data = list);
  }

}
