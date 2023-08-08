import { Component, Input } from '@angular/core';
import { Team } from 'src/app/model/data';

@Component({
  selector: 'am-team-view-item',
  templateUrl: './team-view-item.component.html',
  styleUrls: ['./team-view-item.component.scss']
})
export class TeamViewItemComponent {

  @Input() team: Team;
}
