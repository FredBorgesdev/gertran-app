import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayJustifyComponent } from './workday-justify.component';

describe('WorkdayJustifyComponent', () => {
  let component: WorkdayJustifyComponent;
  let fixture: ComponentFixture<WorkdayJustifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkdayJustifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayJustifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
