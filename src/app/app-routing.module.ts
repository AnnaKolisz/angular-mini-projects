import { Injectable, NgModule } from '@angular/core';
import { RouterModule, RouterStateSnapshot, Routes, TitleStrategy } from '@angular/router';
import { DateHourPickersComponent } from './date-hour-pickers/date-hour-pickers.component';
import { HomeComponent } from './home/home.component';
import { MultiFilterComponent } from './multi-filter/multi-filter.component';

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
