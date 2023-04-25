import { DataSource } from "@angular/cdk/table";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { BehaviorSubject, Observable, Subscription, combineLatest, from, of } from "rxjs";
import { Employee } from "src/app/model/data";
import { MatTableDataSource } from "@angular/material/table";
import { delay, exhaustMap, filter, map, startWith, switchMap, tap } from "rxjs/operators";
import { ListRange } from "@angular/cdk/collections";
import { NgZone } from "@angular/core";

export class TableDataSource extends DataSource<Employee> {
    private _pageSize = 100; // elements
    private _pages = 10; // pages
    private _pageOffset = 100; // elements
    private _pageCache = new Set<number>();
    private _subscription: Subscription;
    private _viewPort: CdkVirtualScrollViewport;


    matTableDataSource: MatTableDataSource<any> = new MatTableDataSource();

    get data(){
       return this.matTableDataSource.data
    }
    set data(val){
        this.matTableDataSource.data = val;
    }

    dataStream = this.matTableDataSource.connect().asObservable();
    renderedStream = new BehaviorSubject<any[]>([]);

    constructor(private ngZone: NgZone) {
        super();
    
      }

      attach(viewPort: CdkVirtualScrollViewport) {
        if (!viewPort) {
          throw new Error('ViewPort is undefined');
        }
        this._viewPort = viewPort;
    
        this.initFetchingOnScrollUpdates();
    
        // Attach DataSource as CdkVirtualForOf so ViewPort can access dataStream
        this._viewPort.attach(this as any);
    
        // Trigger range change so that 1st page can be loaded
        this._viewPort.setRenderedRange({ start: 0, end: 10 });
      }

      // Called by CDK Table
  connect(): Observable<any[]> {
    const tableData = this.matTableDataSource.connect();
    const filtered =
      this._viewPort === undefined
        ? tableData
        : this.filterByRangeStream(tableData);

    filtered.subscribe(data => {
      this.renderedStream.next(data);
    });

    return this.renderedStream.asObservable();
  }

  disconnect(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private initFetchingOnScrollUpdates() {
    this._subscription = this._viewPort.renderedRangeStream
      .pipe(
        switchMap(range => this._getPagesToDownload(range)),
        filter(page => !this._pageCache.has(page)),
      //  exhaustMap(page => this._simulateFetchAndUpdate(page))
      )
      .subscribe();
  }

  private _getPagesToDownload({ start, end }: { start: number; end: number }) {
    const startPage = this._getPageForIndex(start);
    const endPage = this._getPageForIndex(end + this._pageOffset);
    const pages: number[] = [];
    for (let i = startPage; i <= endPage && i < this._pages; i++) {
      if (!this._pageCache.has(i)) {
        pages.push(i);
      }
    }
    return from(pages);
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }

  private filterByRangeStream(tableData: Observable<any[]>) {
    const rangeStream = this._viewPort.renderedRangeStream.pipe(
      startWith({} as ListRange)
    );
    const filtered = combineLatest(tableData, rangeStream).pipe(
      map(([data, { start, end }]) => {
        return start === null || end === null ? data : data.slice(start, end)
      })
    );
    return filtered;
  }

  private _simulateFetchAndUpdate(page: number): Observable<any[]> {
    return of(page).pipe(
      filter(page => !this._pageCache.has(page)),
      map(page =>
        Array.from(Array(this._pageSize).keys()).map((v, i) => {
            console.log(v, i);
        //   const id = page * this._pageSize + i;
        //   const firstName = name.firstName();
        //   const lastName = name.lastName();
        //   const email = internet.email(firstName, lastName);
        //   return { id, firstName, lastName, email } as User;
        })
      ),
      delay(1000),
      tap(() => this._pageCache.add(page)),
      tap(users => {
        const newData = [...this.matTableDataSource.data];
        newData.splice(page * this._pageSize, this._pageSize, ...users);
        this.matTableDataSource.data = newData;
      })
    );
  }
}