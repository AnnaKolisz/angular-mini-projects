import { Component, Input } from '@angular/core';
import { Review } from 'src/app/model/data';
import { REVIEW_COURSES } from '../review-form.component';

@Component({
  selector: 'am-review-stats',
  templateUrl: './review-stats.component.html',
  styleUrls: ['./review-stats.component.scss']
})
export class ReviewStatsComponent {

  //SIGNAALS
  //https://medium.com/@KkambizZ/angular-16-signals-explained-with-five-examples-6b773a12c974

  allCourses = REVIEW_COURSES.map(courseName => ({ courseName, stat: null }));
  total: number

  @Input() set reviews(reviews: Review[]) {
    this.total = reviews.reduce((a, c) => a + c.rate, 0) / reviews.length;
    this.allCourses.forEach(course => {
      const arr = reviews.filter(item => item.courseName === course.courseName);
      course.stat = arr.reduce((a, c) => a + c.rate, 0) / arr.length;
    });

  }

}
