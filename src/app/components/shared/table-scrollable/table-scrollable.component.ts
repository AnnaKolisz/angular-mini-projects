import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { KeyTitle } from 'src/app/model/data';

@Component({
  selector: 'am-table-scrollable',
  templateUrl: './table-scrollable.component.html',
  styleUrls: ['./table-scrollable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableScrollableComponent<T> {

  dataSource =new MatTableDataSource<T>();
  @Input() configColumns;
  @Input() displayedColumns: string[];
  dataa;

  @Input() set data(arr: T[] | null){
    this.dataSource.data = arr || [];
    this.dataa = arr || [];
  }
 // https://stackblitz.com/edit/cdk-virtual-mat-table?file=src%2Fapp%2Fapp.component.ts,src%2Fapp%2Fapp.component.html

}
