import { Component, Input } from '@angular/core';
import { Review } from 'src/app/model/data';
import { REVIEW_COURSES } from '../review-utility';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'am-review-stats',
    templateUrl: './review-stats.component.html',
    styleUrls: ['./review-stats.component.scss'],
    imports: [CommonModule]
})
export class ReviewStatsComponent {

  colors = [
    { foo: 'Terrible' },
    { foo: 'Bad' },
    { foo: 'Ok' },
    { foo: 'Good' },
    { foo: 'Excellent' },
  ]


  allCourses: { courseName: string, stat: number }[] = REVIEW_COURSES.map(courseName => ({ courseName, stat: 0 }));
  total: number

  @Input() set reviews(reviews: Review[]) {
    this.total = reviews.reduce((a, c) => a + c.rate, 0) / reviews.length;
    this.allCourses.forEach(course => {
      const arr = reviews.filter(item => item.courseName === course.courseName);
      course.stat = arr.reduce((a, c) => a + c.rate, 0) / arr.length;
    });
  }

}
