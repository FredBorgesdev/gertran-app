import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringRequestsComponent } from './monitoring-requests.component';

describe('MonitoringRequestsComponent', () => {
  let component: MonitoringRequestsComponent;
  let fixture: ComponentFixture<MonitoringRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
