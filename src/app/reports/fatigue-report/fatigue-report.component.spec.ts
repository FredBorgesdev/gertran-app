import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatigueReportComponent } from './fatigue-report.component';

describe('FatigueReportComponent', () => {
  let component: FatigueReportComponent;
  let fixture: ComponentFixture<FatigueReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatigueReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FatigueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
