import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayAutomationsTableComponent } from './workday-automations-table.component';

describe('WorkdayAutomationsTableComponent', () => {
  let component: WorkdayAutomationsTableComponent;
  let fixture: ComponentFixture<WorkdayAutomationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkdayAutomationsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayAutomationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
