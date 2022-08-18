import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFormRatingsComponent } from './review-form-ratings.component';

describe('ReviewFormRatingsComponent', () => {
  let component: ReviewFormRatingsComponent;
  let fixture: ComponentFixture<ReviewFormRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewFormRatingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewFormRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
