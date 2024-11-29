import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFormStarComponent } from './review-form-star.component';

describe('ReviewFormStarComponent', () => {
  let component: ReviewFormStarComponent;
  let fixture: ComponentFixture<ReviewFormStarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewFormStarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewFormStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
