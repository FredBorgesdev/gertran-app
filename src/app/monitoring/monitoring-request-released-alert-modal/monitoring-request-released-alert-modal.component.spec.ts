import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringRequestReleasedAlertModalComponent } from './monitoring-request-released-alert-modal.component'
describe('MonitoringRequestReleasedAlertModalComponent', () => {
  let component: MonitoringRequestReleasedAlertModalComponent;
  let fixture: ComponentFixture<MonitoringRequestReleasedAlertModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringRequestReleasedAlertModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringRequestReleasedAlertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
