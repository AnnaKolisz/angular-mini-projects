import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPortionComponent } from './data-portion.component';

describe('DataPortionComponent', () => {
  let component: DataPortionComponent;
  let fixture: ComponentFixture<DataPortionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPortionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPortionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
