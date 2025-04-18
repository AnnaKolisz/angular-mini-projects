
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HourMinuteSec } from './hour-picker-input.component';

@Component({
    selector: 'am-hour-picker',
    template: `
    <div [formGroup]="form">
      <mat-form-field placeholder="'Jakie cudo'">
        <!--  <mat-label>wpisz czas</mat-label> -->
          <am-hour-picker-input formControlName="times"></am-hour-picker-input>
        </mat-form-field>
    </div>
    <pre> {{ timy | json }}</pre>
`,
    styles: [],
    standalone: false
})
export class HourPickerComponent implements OnInit {

  form: FormGroup = new FormGroup({
    times: new FormControl<HourMinuteSec>(null),
  });

  get timy(){
    return this.form.get('times').value
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(res => console.log(`%c${res}`, "color: green, font-size: 24px"));
  }



}
