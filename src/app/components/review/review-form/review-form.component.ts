import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { Review } from 'src/app/model/data';
import { ReviewFormRatingsComponent } from '../review-form-ratings/review-form-ratings.component';
import { ReviewFormStarComponent } from '../review-form-star/review-form-star.component';

@Component({
    selector: 'am-review-form',
    templateUrl: './review-form.component.html',
    styleUrls: ['./review-form.component.scss'],
    imports: [ReactiveFormsModule, MaterialModule, ReviewFormStarComponent]
})
export class ReviewFormComponent {

  @Input() courses: string[];

  revForm = new FormGroup({
    rate: new FormControl<number>(0, { nonNullable: true, validators: Validators.required }),
    courseName: new FormControl('', { nonNullable: true, validators: Validators.required }),
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    review: new FormControl('', { nonNullable: true, validators: Validators.required })
  });


  constructor() { }

  addReview() {
    const value = <Review>this.revForm.getRawValue();
    console.log(value);
    //   this.reviews = [... this.reviews, value];
    this.revForm.reset();
  }

}
