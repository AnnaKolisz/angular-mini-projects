import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamViewItemComponent } from './team-view-item.component';

describe('TeamViewItemComponent', () => {
  let component: TeamViewItemComponent;
  let fixture: ComponentFixture<TeamViewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamViewItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
