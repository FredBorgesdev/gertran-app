import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnalyticalReportComponent} from './analytical-report.component';

xdescribe('AnalyticalReportComponent', () => {
  let component: AnalyticalReportComponent;
  let fixture: ComponentFixture<AnalyticalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalyticalReportComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
