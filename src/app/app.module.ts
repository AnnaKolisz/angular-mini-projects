import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { MultiFilterComponent } from './components/multi-filter/multi-filter.component';
import { DateHourPickersComponent } from './components/date-hour-pickers/date-hour-pickers.component';
import { HourPickerComponent } from './components/date-hour-pickers/hour-picker/hour-picker.component';
import { MenuComponent } from './components/menu/menu.component';
import { ResizeComponent } from './components/resize/resize.component';
import { TableComponent } from './components/shared/table/table.component';
import { SignaturePadComponent } from './components/signature-pad/signature-pad.component';
import { TableScrollableComponent } from './components/shared/table-scrollable/table-scrollable.component';
import { DataPortionComponent } from './components/data-portion/data-portion.component';
import { TablePaginationComponent } from './components/shared/table-pagination/table-pagination.component';
import { TableVirtualComponent } from './components/shared/table-virtual/table-virtual.component';
import { DateActionComponent } from './components/date-hour-pickers/date-action/date-action.component';
import { SelectAutocompleteComponent } from './components/select-autocomplete/select-autocomplete.component';
import { TeamViewItemComponent } from './components/select-autocomplete/team-view-item/team-view-item.component';
import { MatdatepickerTimeComponent } from './components/date-hour-pickers/matdatepicker-time/matdatepicker-time.component';
import { InfiniteScrollComponent } from './components/shared/infinite-scroll/infinite-scroll.component';
import { DirectiveModule } from './shared/directive/directive.module';
import { HourPickerInput } from './components/date-hour-pickers/hour-picker/hour-picker-input.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DateHourPickersComponent,
    HourPickerComponent,
    MultiFilterComponent,
    MenuComponent,
    ResizeComponent,
    TableComponent,
    SignaturePadComponent,
    TableScrollableComponent,
    DataPortionComponent,
    TablePaginationComponent,
    TableVirtualComponent,
    DateActionComponent,
    SelectAutocompleteComponent,
    TeamViewItemComponent,
    MatdatepickerTimeComponent,
    InfiniteScrollComponent,
    HourPickerInput

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DirectiveModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
