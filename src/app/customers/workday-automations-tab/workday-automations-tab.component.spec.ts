import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayAutomationsTabComponent } from './workday-automations-tab.component';

describe('WorkdayAutomationsTabComponent', () => {
  let component: WorkdayAutomationsTabComponent;
  let fixture: ComponentFixture<WorkdayAutomationsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkdayAutomationsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayAutomationsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
