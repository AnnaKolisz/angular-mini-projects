import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {  provideMomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { filter, Subject, takeUntil } from 'rxjs';

export const MY_FORMATy= {
  parse: {
    dateInput: 'dddd.MM.YYYY HH:mm:ss',
  },
  display: {
    dateInput: 'yyyy-mm-dd HH:mm:ss',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD.MM.YYYY',
    monthYearA11yLabel: 'MMM YYYY',
  },
};

@Component({
    selector: 'am-matdatepicker-time',
    templateUrl: './matdatepicker-time.component.html',
    styleUrls: ['./matdatepicker-time.component.scss'],
    providers: [
        provideMomentDateAdapter(MY_FORMATy),
    ],
    standalone: false
})
export class MatdatepickerTimeComponent implements OnDestroy, OnInit  {

  showCalendar = false;
  dateTime;
  formatDateTimeView = 'DD.MM.YYYY HH:mm';
  formDate = new FormGroup({
    dateFormat: new FormControl<string>(''),
    date: new FormControl<Moment>(null),
    time: new FormControl(null),

  });
  private signal$ = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    this.changesForm()
  }

  ngOnDestroy(): void {
    this.signal$.next();
    this.signal$.complete();
  }

  get selectedDate(): Moment | undefined {
    
    return this.formDate?.get('date')?.value;
  }

  set selectedDate(value: Moment | undefined) {
    console.log(value);
    this.formDate?.get('date')?.setValue(value);
  }

  changesForm() {
    this.formDate.get('date').valueChanges.pipe(
      filter(item => !!item),
      takeUntil(this.signal$)
    ).subscribe(res => {
      const dateMoment = this.formDate.get('date').value;
      const dateValue = dateMoment.format(this.formatDateTimeView)
      this.formDate.patchValue({ dateFormat: dateValue });
    });
    this.formDate.get('time').valueChanges.pipe(
      filter(item => !!item),
      takeUntil(this.signal$)
    ).subscribe(res => {
      console.log(res);
      const { hour, minute, second } = res;
      const dateValue = this.formDate.get('date').value;
      dateValue.hour(hour).minute(minute).second(second);
      this.formDate.patchValue({ date: dateValue });
    })
  }

  sendDateUpper() {
    this.showCalendar = false;
  }

  cancel() {
    // this.formDate.reset();
    this.showCalendar = false;

  }



}
