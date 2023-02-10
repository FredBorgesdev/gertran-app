import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayAutomationsFormComponent } from './workday-automations-form.component';

describe('WorkdayAutomationsFormComponent', () => {
  let component: WorkdayAutomationsFormComponent;
  let fixture: ComponentFixture<WorkdayAutomationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkdayAutomationsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayAutomationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
