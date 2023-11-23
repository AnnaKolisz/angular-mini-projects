import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'am-matdatepicker-time',
  templateUrl: './matdatepicker-time.component.html',
  styleUrls: ['./matdatepicker-time.component.scss']
})
export class MatdatepickerTimeComponent  {

  selected: Date | null;

}
