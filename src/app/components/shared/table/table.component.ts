import { Component, Input, OnInit } from '@angular/core';
import { ConfigTable } from 'src/app/model/data';

@Component({
    selector: 'am-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    standalone: false
})
export class TableComponent<T>  {

  @Input() headers: string[];
  @Input() config: ConfigTable[];
  @Input() data: T[];

  constructor() { }



}
