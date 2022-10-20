import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {

  courses = [ "Intermadiate HTML & CSS", "Javascript - hard parts", "Angular from basic", "Vue - from zero to hero"]

  constructor() { }

  ngOnInit(): void {
  }

}
