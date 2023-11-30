import { Component, Input } from '@angular/core';
import { Review } from 'src/app/model/data';

@Component({
  selector: 'am-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent {

  @Input() reviews: Review[] =  [];

}
