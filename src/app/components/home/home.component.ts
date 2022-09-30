import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/data';



const projects: Project[] = [
    {
      title: "Multi filtr",
      description: "This show filtr per column",
      link: 'filter'
    },
    {
      title: "Hour Date Picker",
      description: "My custom form field by custom accessor validator",
      link: 'picker'
    },
    {
      title: "Review form",
      description: "Form to evaluate the hypothetical workshop ",
      link: 'review'
    },

]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  list: Project[];
  

  constructor() { }

  ngOnInit(): void {
    this.list = projects;
  }

}
