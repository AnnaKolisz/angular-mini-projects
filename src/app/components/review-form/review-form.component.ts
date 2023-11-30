import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Review } from 'src/app/model/data';



@Component({
  selector: 'am-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {

  courses = REVIEW_COURSES;

  revForm = new FormGroup({
    rate: new FormControl('', { nonNullable: true, validators: Validators.required }),
    courseName: new FormControl('', { nonNullable: true, validators: Validators.required }),
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    review: new FormControl('', { nonNullable: true, validators: Validators.required })
  });
  reviews: Review[] = [];

  constructor() { }

  ngOnInit(): void {
    this.reviews = [...REVIEW_INITIAL_DATA];
  }

  addReview() {
    console.log(this.revForm)
  }

}

export const REVIEW_COURSES = ["Intermadiate HTML & CSS", "Javascript - hard parts", "Angular from basic", "Vue - from zero to hero"];

export const REVIEW_INITIAL_DATA = [
  {
    rate: 8,
    courseName: REVIEW_COURSES[0],
    name: 'David',
    review: 'I learned a lot! The instructor is a very good teacher,  I enjoyed the course, the jokes, the projects, challenges.',
    dateOfReview: new Date(2023, 10, 17)
  },
  {
    rate: 9,
    courseName: REVIEW_COURSES[1],
    name: 'Anna',
    review: 'I love the course. It\'s pretty complete and the instructor does a great job explaining complex concepts in JavaScript.',
    dateOfReview: new Date(2023, 10, 17)
  },
  {
    rate: 7,
    courseName: REVIEW_COURSES[2],
    name: 'John',
    review: 'It is little outdated, but still you can learn sth',
    dateOfReview: new Date(2023, 10, 17)
  }

]
