import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'am-date-action',
  templateUrl: './date-action.component.html',
  styleUrls: ['./date-action.component.scss']
})
export class DateActionComponent {
  
   dateForm = new FormControl<Date | null>(null);

  setUpDate(){
    this.dateForm.patchValue(new Date());
    
  }

}
