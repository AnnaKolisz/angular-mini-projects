import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewStarInputComponent } from './review-star-input.component';

describe('ReviewStarInputComponent', () => {
  let component: ReviewStarInputComponent;
  let fixture: ComponentFixture<ReviewStarInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewStarInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewStarInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
