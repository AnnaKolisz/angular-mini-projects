import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'am-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {

  courses = [ "Intermadiate HTML & CSS", "Javascript - hard parts", "Angular from basic", "Vue - from zero to hero"];

  comForm = new FormGroup({
    rate: new FormControl('', { nonNullable: true, validators: Validators.required}),
    courseName: new FormControl('', { nonNullable: true, validators: Validators.required}),
    name: new FormControl('', { nonNullable: true, validators: Validators.required}),
    comments: new FormControl('', { nonNullable: true, validators: Validators.required})
  })

  constructor() { }

  ngOnInit(): void {
  }

  addReview(){
    console.log(this.comForm)
  }

}
