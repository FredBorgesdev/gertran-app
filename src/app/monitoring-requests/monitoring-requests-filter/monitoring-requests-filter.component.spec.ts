import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringRequestsFilterComponent } from './monitoring-requests-filter.component';

describe('MonitoringRequestsFilterComponent', () => {
  let component: MonitoringRequestsFilterComponent;
  let fixture: ComponentFixture<MonitoringRequestsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringRequestsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringRequestsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
