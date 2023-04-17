import { Component } from '@angular/core';
import { Employee } from 'src/app/model/data';
import { DataService } from 'src/app/service/data.service';
import { COLUMNS, CONFIG_COLUMNS } from 'src/app/service/utility';

@Component({
  selector: 'am-data-portion',
  templateUrl: './data-portion.component.html',
  styleUrls: ['./data-portion.component.scss']
})
export class DataPortionComponent {
  
  data: Employee[] = [];
  configColumns = CONFIG_COLUMNS;
  displayedColumns = COLUMNS;

  constructor(
    private dataService: DataService,
  ) { }
  
  ngOnInit(): void {
    this.dataService.getData1000().subscribe(list => this.data = list);
  }
}