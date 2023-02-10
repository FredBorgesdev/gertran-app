import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayTabComponent } from './workday-tab.component';

describe('WorkdayTabComponent', () => {
  let component: WorkdayTabComponent;
  let fixture: ComponentFixture<WorkdayTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkdayTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
