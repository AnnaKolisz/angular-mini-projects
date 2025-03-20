import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortSpecialComponent } from './sort-special.component';

describe('SortSpecialComponent', () => {
  let component: SortSpecialComponent;
  let fixture: ComponentFixture<SortSpecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortSpecialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
