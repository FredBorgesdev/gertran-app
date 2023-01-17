import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MonitoringRequestsTableComponent} from './monitoring-requests-table.component';

xdescribe('MonitoringRequestsTableComponent', () => {
  let component: MonitoringRequestsTableComponent;
  let fixture: ComponentFixture<MonitoringRequestsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonitoringRequestsTableComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
