import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayJustificationComponent } from './workday-justification.component';

describe('WorkdayJustificationComponent', () => {
  let component: WorkdayJustificationComponent;
  let fixture: ComponentFixture<WorkdayJustificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkdayJustificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayJustificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
