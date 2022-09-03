import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopsWorkingHoursComponent } from './stops-working-hours.component';

describe('StopsWorkingHoursComponent', () => {
  let component: StopsWorkingHoursComponent;
  let fixture: ComponentFixture<StopsWorkingHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StopsWorkingHoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StopsWorkingHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
