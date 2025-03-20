import { DatePipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConfigTable, EmployeeAddress } from 'src/app/model/data';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'am-sort-special',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatSortModule],
  templateUrl: './sort-special.component.html',
  styleUrl: './sort-special.component.scss'
})
export class SortSpecialComponent {

  sortService = inject(DataService);
  configColumns: ConfigTable[] = [
    { key: 'firstName', columnName: 'First Name' },
    { key: 'lastName', columnName: 'Last Name' },
    { key: 'location', columnName: 'Location' },
    { key: 'address', columnName: 'Address' }
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['lp', 'firstName', 'lastName', 'location', 'address'];
  dataSource = new MatTableDataSource<EmployeeAddress>();
  originalData: EmployeeAddress[] = [];

  ngOnInit(): void {
    this.sortService.getDataForAddress().subscribe(res => {
      this.dataSource.data = res;
      this.originalData = res.slice();
    }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'address') {
        const sortKey = this.customSortKey(item.address);
        return sortKey;
      }
      return (<any>item)[property];
    };

    this.dataSource.sortData = (data: EmployeeAddress[], sort: MatSort) => {
      const dataCopy = data.slice();
      if (!sort.active || sort.direction === '') {
        return dataCopy;
      }
      const isAsc = sort.direction === 'asc';
      if (sort.active === 'address') {
        return dataCopy.sort((a, b) => {
          const aKey = this.customSortKey(a.address);
          const bKey = this.customSortKey(b.address);
          return this.compareCustomSortKeys(aKey, bKey) * (isAsc ? 1 : -1);
        });
      } else {
        return dataCopy.sort((a, b) => {
          return ((<any>a)[sort.active] < (<any>b)[sort.active] ? -1 : 1) * (isAsc ? 1 : -1);
        });
      }
    }
  }

  sortData(sort: Sort) {
    const data = this.originalData.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = this.originalData.slice();
      return;
    }
    const isAsc = sort.direction === 'asc';
    if (sort.active === 'address') {
      this.dataSource.data = data.sort((a, b) => {
        const aKey = this.customSortKey(a.address);
        const bKey = this.customSortKey(b.address);
        const returnValue = this.compareCustomSortKeys(aKey, bKey) * (isAsc ? 1 : -1);
        return returnValue
      });
    } else {
      this.dataSource.data = data.sort((a, b) => {
        const returnValue = ((<any>a)[sort.active] < (<any>b)[sort.active] ? -1 : 1) * (isAsc ? 1 : -1);
        console.log(`Sorting - a: ${(<any>a)[sort.active]}, b: ${(<any>b)[sort.active]}, returnValue: ${returnValue}`);
        return returnValue;

      });
    }

  }


  customSortKey(value: string): any {
    value = value.trim();
    const parts = value.split(/(\d+)/).filter(part => part !== '').map(part => isNaN(Number(part)) ? part : parseInt(part, 10));
    return parts;
  }

  compareCustomSortKeys(aParts: (string | number)[], bParts: (string | number)[]): number {
    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {

      if (aParts[i] === undefined) return -1;
      if (bParts[i] === undefined) return 1;
      if (typeof aParts[i] === 'string' && typeof bParts[i] === 'string') {
        const comparison = (<string>aParts[i]).localeCompare((<string>bParts[i]));
        if (comparison !== 0) return comparison;
      } else {
        if (aParts[i] < bParts[i]) return -1;
        if (aParts[i] > bParts[i]) return 1;
      }
    }
    return 0;
  }

}
