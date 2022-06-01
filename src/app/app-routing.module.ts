import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DateHourPickersComponent } from './date-hour-pickers/date-hour-pickers.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'picker', component: DateHourPickersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
