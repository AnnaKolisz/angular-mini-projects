import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Optional, Output, Self, signal } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { ReviewStarInputComponent } from './review-star-input/review-star-input.component';
import { Subscription } from 'rxjs';


@Component({
    selector: 'am-review-form-star',
    imports: [ReviewStarInputComponent, MatFormFieldModule, ReactiveFormsModule],
    templateUrl: './review-form-star.component.html',
    styleUrl: './review-form-star.component.scss'
})
export class ReviewFormStarComponent implements OnInit, OnDestroy, ControlValueAccessor {

  pointsToName = new Map([
    [1, "Terrible"],
    [2, "Bad"],
    [3, "OK"],
    [4, "Good"],
    [5, "Excelent"],
  ]);

  rate = new FormControl<number>(null);
  rateName = signal('')
  sub$: Subscription;
  onTouched: () => {};
  ngControl = inject(NgControl, { optional: true, self: true });

  constructor() {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.sub$ = this.rate.valueChanges.subscribe(val => {
      this.rateName.set(this.pointsToName.get(val) || '');
    })
  }

  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }


  writeValue(obj: any): void {
    this.rate.setValue(obj, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.rate.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.rate.disable() : this.rate.enable();
  }


}
