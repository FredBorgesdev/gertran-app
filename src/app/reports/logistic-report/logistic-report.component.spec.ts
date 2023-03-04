import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticReportComponent } from './logistic-report.component';

describe('LogisticReportComponent', () => {
  let component: LogisticReportComponent;
  let fixture: ComponentFixture<LogisticReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogisticReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
