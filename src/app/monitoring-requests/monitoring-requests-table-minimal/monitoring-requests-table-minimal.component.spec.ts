import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MonitoringRequestsTableMinimalComponent} from './monitoring-requests-table-minimal.component';

xdescribe('MonitoringRequestsTableComponent', () => {
  let component: MonitoringRequestsTableMinimalComponent;
  let fixture: ComponentFixture<MonitoringRequestsTableMinimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonitoringRequestsTableMinimalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringRequestsTableMinimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
