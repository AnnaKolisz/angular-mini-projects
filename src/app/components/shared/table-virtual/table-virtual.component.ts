import { SelectionModel } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, Input, NgZone, ViewChild } from '@angular/core';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { TableDataSource } from './table-data-source';

@Component({
    selector: 'am-table-virtual',
    templateUrl: './table-virtual.component.html',
    styleUrls: ['./table-virtual.component.scss'],
    standalone: false
})
export class TableVirtualComponent<T> {

  displayedColumns: string[];
  dataSource:TableDataSource;
  itemSize = 16;
  offset: number = 0;
  @Input() configColumns;
  @Input() set columns(value: string[]){
    this.displayedColumns = ['select', ...value]
  }
  @Input() set data(arr: T[]){
    this.dataSource.data = arr;
  }
  selection = new SelectionModel<T>(true, []);
  @ViewChild(CdkVirtualScrollViewport, { static: true }) viewPort: CdkVirtualScrollViewport;

  constructor(
    private ngZone: NgZone,

  ) {
    this.dataSource = new TableDataSource(this.ngZone);
  }

  ngOnInit(){
    this.dataSource.attach(this.viewPort);
    this.viewPort.scrolledIndexChange
      .pipe(
        map(() => ( (this.viewPort.getOffsetToRenderedContentStart() || 0) * -1)),
        distinctUntilChanged(),
      )
      .subscribe(offset => (this.offset = offset));

    this.viewPort.renderedRangeStream.subscribe(range => {
      this.offset = range.start * -this.itemSize;
    });
  }




 // https://stackblitz.com/edit/angular-table-virtual-scroll-sticky-headers-nftnae?file=src%2Fapp%2Fuser-table-data-source.ts,src%2Fapp%2Fapp.component.css

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
