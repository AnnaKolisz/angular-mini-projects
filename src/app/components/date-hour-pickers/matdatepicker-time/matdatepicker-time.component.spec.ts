import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatdatepickerTimeComponent } from './matdatepicker-time.component';

describe('MatdatepickerTimeComponent', () => {
  let component: MatdatepickerTimeComponent;
  let fixture: ComponentFixture<MatdatepickerTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatdatepickerTimeComponent]
    });
    fixture = TestBed.createComponent(MatdatepickerTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
