import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableScrollableComponent } from './table-scrollable.component';

describe('TableScrollableComponent', () => {
  let component: TableScrollableComponent;
  let fixture: ComponentFixture<TableScrollableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableScrollableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableScrollableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
