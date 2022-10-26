import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringRequestsCheckListComponent } from './monitoring-requests-check-list.component';

describe('MonitoringRequestsCheckListComponent', () => {
  let component: MonitoringRequestsCheckListComponent;
  let fixture: ComponentFixture<MonitoringRequestsCheckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringRequestsCheckListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringRequestsCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
