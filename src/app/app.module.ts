import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './home/home.component';
import { DateHourPickersComponent } from './date-hour-pickers/date-hour-pickers.component';
import { HourPickerComponent } from './date-hour-pickers/hour-picker/hour-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiFilterComponent } from './multi-filter/multi-filter.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DateHourPickersComponent,
    HourPickerComponent,
    MultiFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
