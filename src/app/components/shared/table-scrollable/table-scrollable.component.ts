import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
  displayedColumns: string[];
  dataOriginal: T[] = [];
  @Output() updateScrollItems = new EventEmitter<number>();
  @Input() set columns(value: string[]){
    this.displayedColumns = ['select', ...value]
  }

  selection = new SelectionModel<T>(true, []);

  @Input() set data(arr: T[]){
    this.dataOriginal = arr;
    if(arr){
      this.dataSource.data = arr.slice(0, 100);
      this.updateScrollItems.emit(this.dataSource.data.length);

    }
 
  }

  onScroll() {
    const num = this.dataSource.data.length + 1;
    const newPart = this.dataOriginal.slice(num, (num+50));
    this.dataSource.data.push(...newPart)
    this.dataSource._updateChangeSubscription();
    this.updateScrollItems.emit(this.dataSource.data.length);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }




}
