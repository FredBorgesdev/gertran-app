import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClientMonitoringRequestsComponent} from './client-monitoring-requests.component';

describe('MonitoringRequestsComponent', () => {
  let component: ClientMonitoringRequestsComponent;
  let fixture: ComponentFixture<ClientMonitoringRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientMonitoringRequestsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMonitoringRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
