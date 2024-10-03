import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayFormCreateComponent } from './workday-form-create.component';

describe('WorkdayFormCreateComponent', () => {
  let component: WorkdayFormCreateComponent;
  let fixture: ComponentFixture<WorkdayFormCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkdayFormCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkdayFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
