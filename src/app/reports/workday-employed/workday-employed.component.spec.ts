import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayEmployedComponent } from './workday-employed.component';

describe('WorkdayEmployedComponent', () => {
  let component: WorkdayEmployedComponent;
  let fixture: ComponentFixture<WorkdayEmployedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkdayEmployedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayEmployedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
