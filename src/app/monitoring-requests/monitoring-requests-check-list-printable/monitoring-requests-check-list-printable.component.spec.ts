import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringRequestsCheckListPrintableComponent } from './monitoring-requests-check-list-printable.component';

describe('MonitoringRequestsCheckListPrintableComponent', () => {
  let component: MonitoringRequestsCheckListPrintableComponent;
  let fixture: ComponentFixture<MonitoringRequestsCheckListPrintableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringRequestsCheckListPrintableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringRequestsCheckListPrintableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
