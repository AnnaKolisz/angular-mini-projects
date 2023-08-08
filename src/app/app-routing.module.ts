import { Injectable, NgModule } from '@angular/core';
import { RouterModule, RouterStateSnapshot, Routes, TitleStrategy } from '@angular/router';
import { DateHourPickersComponent } from './components/date-hour-pickers/date-hour-pickers.component';
import { HomeComponent } from './components/home/home.component';
import { MultiFilterComponent } from './components/multi-filter/multi-filter.component';
import { ResizeComponent } from './components/resize/resize.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { SignaturePadComponent } from './components/signature-pad/signature-pad.component';
import { DataPortionComponent } from './components/data-portion/data-portion.component';
import { SelectAutocompleteComponent } from './components/select-autocomplete/select-autocomplete.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'picker',
    component: DateHourPickersComponent,
    title: 'Custom Hour'
  },
  {
    path: 'filter',
    component: MultiFilterComponent,
    title: 'Multi-filter'
  },
   
  {
    path: 'review',
    component: ReviewFormComponent,
    title: 'Review'
  },
  {
    path: 'resize',
    component: ResizeComponent,
    title: 'Resize view'
  },
  {
    path: 'signature-pad',
    component: SignaturePadComponent,
    title: 'Signature Pad'
  },
  {
    path: 'data-portion',
    component: DataPortionComponent,
    title: 'Data portion'
  },
  {
    path: 'select_autocomplete',
    component: SelectAutocompleteComponent,
    title: 'Select with autocomplete'
  },
];

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      document.title = `AngMini - ${title}`;
    } else {
      document.title = `AngMini - Home`;
    };
  };
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: TitleStrategy, useClass: TemplatePageTitleStrategy }]
})
export class AppRoutingModule { }
