import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MonitoringRequestsTableClientComponent} from './monitoring-requests-table-client.component';

xdescribe('MonitoringRequestsTableComponent', () => {
  let component: MonitoringRequestsTableClientComponent;
  let fixture: ComponentFixture<MonitoringRequestsTableClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonitoringRequestsTableClientComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringRequestsTableClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
