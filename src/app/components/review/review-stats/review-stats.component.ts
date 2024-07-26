import { Component, Input } from '@angular/core';
import { Review } from 'src/app/model/data';
import { REVIEW_COURSES } from '../review-utility';


@Component({
  selector: 'am-review-stats',
  templateUrl: './review-stats.component.html',
  styleUrls: ['./review-stats.component.scss'],
  standalone: true,
  imports: []
})
export class ReviewStatsComponent {


  allCourses: { courseName: string, stat: number }[] = REVIEW_COURSES.map(courseName => ({ courseName, stat: 0 }));
  total: number

  @Input() set reviews(reviews: Review[]) {
    console.log(reviews);
    this.total = reviews.reduce((a, c) => a + c.rate, 0) / reviews.length;
    this.allCourses.forEach(course => {
      const arr = reviews.filter(item => item.courseName === course.courseName);
      course.stat = arr.reduce((a, c) => a + c.rate, 0) / arr.length;
    });
    console.log(this.allCourses)
  }

}
