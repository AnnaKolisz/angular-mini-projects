import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableVirtualComponent } from './table-virtual.component';

describe('TableVirtualComponent', () => {
  let component: TableVirtualComponent;
  let fixture: ComponentFixture<TableVirtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableVirtualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
