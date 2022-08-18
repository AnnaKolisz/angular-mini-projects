import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-review-form-ratings',
  templateUrl: './review-form-ratings.component.html',
  styleUrls: ['./review-form-ratings.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReviewFormRatingsComponent),
      multi: true
  }
  ]
})
export class ReviewFormRatingsComponent implements OnInit, ControlValueAccessor  {

  ratings: number[];
  selectedRate: number;

  constructor() { }
  ngOnInit(): void {
    this.ratings = [...Array(10)].map((item, index) => ++index);
  }

  writeValue(obj: number): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }


}
