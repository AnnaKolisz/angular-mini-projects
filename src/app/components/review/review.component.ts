import { Component, OnInit } from '@angular/core';
import { REVIEW_COURSES, REVIEW_INITIAL_DATA } from './review-utility';
import { Review } from 'src/app/model/data';
import { ReviewListComponent } from './review-list/review-list.component';
import { ReviewStatsComponent } from './review-stats/review-stats.component';
import { MatCardModule } from '@angular/material/card';
import { ReviewFormComponent } from './review-form/review-form.component';

@Component({
  selector: 'am-review',
  standalone: true,
  imports: [ReviewListComponent, ReviewStatsComponent, MatCardModule, ReviewFormComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent implements OnInit {

  courses = REVIEW_COURSES;
  reviews: Review[] = [];

  ngOnInit(): void {
    this.reviews = REVIEW_INITIAL_DATA;
  }



}
