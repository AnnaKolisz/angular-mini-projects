import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { MultiFilterComponent } from './components/multi-filter/multi-filter.component';
import { DateHourPickersComponent } from './components/date-hour-pickers/date-hour-pickers.component';
import { HourPickerComponent } from './components/date-hour-pickers/hour-picker/hour-picker.component';
import { MenuComponent } from './components/menu/menu.component';
import { ReviewFormRatingsComponent } from './components/review-form/review-form-ratings/review-form-ratings.component';
import { ResizeComponent } from './components/resize/resize.component';
import { TableComponent } from './components/shared/table/table.component';
import { SignaturePadComponent } from './components/signature-pad/signature-pad.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
   DateHourPickersComponent,
   HourPickerComponent,
    MultiFilterComponent,
    ReviewFormComponent,
    MenuComponent,
    ReviewFormRatingsComponent,
    ResizeComponent,
    TableComponent,
    SignaturePadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
