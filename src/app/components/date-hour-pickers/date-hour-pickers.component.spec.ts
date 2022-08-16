import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateHourPickersComponent } from './date-hour-pickers.component';

describe('DateHourPickersComponent', () => {
  let component: DateHourPickersComponent;
  let fixture: ComponentFixture<DateHourPickersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateHourPickersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateHourPickersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
