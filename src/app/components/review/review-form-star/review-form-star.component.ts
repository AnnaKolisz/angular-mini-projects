import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { ReviewStarInputComponent } from './review-star-input/review-star-input.component';


@Component({
  selector: 'am-review-form-star',
  standalone: true,
  imports: [ReviewStarInputComponent, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './review-form-star.component.html',
  styleUrl: './review-form-star.component.scss'
})
export class ReviewFormStarComponent implements OnInit {

  foo = new Map([
    [1, "Terrible"],
    [2, "Bad"],
    [3, "OK"],
    [4, "Good"],
    [5, "Excelent"],
  ]);

  rate = new FormControl<number>(null);
  rateName: string;

  ngOnInit(): void {
    this.rate.valueChanges.subscribe(value => {
      this.rateName = this.foo.get(value);
    })
  }



}
