import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'am-review-form-ratings',
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

  onChange: any = () => {};
  onTouch: any = () => {};

  constructor() { }

  ngOnInit(): void {
    this.ratings = [...Array(10)].map((item, index) => ++index);
  }

  writeValue(value: number): void {
    this.selectedRate = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  updateValue(newValue: number): void {
    this.onChange(newValue);
    this.onTouch();
  }


}
