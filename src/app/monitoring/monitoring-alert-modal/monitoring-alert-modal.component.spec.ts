import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringAlertModalComponent } from './monitoring-alert-modal.component';

describe('MonitoringAlertModalComponent', () => {
  let component: MonitoringAlertModalComponent;
  let fixture: ComponentFixture<MonitoringAlertModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringAlertModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringAlertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
