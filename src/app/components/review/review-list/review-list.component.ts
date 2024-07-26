import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Review } from 'src/app/model/data';

@Component({
  selector: 'am-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
  standalone: true,
  imports: [DatePipe]
})
export class ReviewListComponent {

  listOfReviews: Review[] = [];

  @Input() courses: string[]; //add as filter

  @Input() set reviews(list: Review[]) {
    this.listOfReviews = list.sort((a, b) => new Date(a.dateOfReview).getTime() - new Date(b.dateOfReview).getTime())
  }

}
