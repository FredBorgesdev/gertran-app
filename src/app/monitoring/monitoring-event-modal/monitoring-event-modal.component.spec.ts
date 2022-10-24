import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringEventModalComponent } from './monitoring-event-modal.component';

describe('MonitoringEventModalComponent', () => {
  let component: MonitoringEventModalComponent;
  let fixture: ComponentFixture<MonitoringEventModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringEventModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
