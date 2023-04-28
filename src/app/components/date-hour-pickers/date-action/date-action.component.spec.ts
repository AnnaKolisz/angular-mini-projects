import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateActionComponent } from './date-action.component';

describe('DateActionComponent', () => {
  let component: DateActionComponent;
  let fixture: ComponentFixture<DateActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
