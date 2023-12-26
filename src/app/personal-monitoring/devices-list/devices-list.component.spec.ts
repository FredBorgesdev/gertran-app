import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonalMonitoringDevicesListComponent} from './devices-list.component';

xdescribe('PersonalMonitoringDevicesListComponent', () => {
  let component: PersonalMonitoringDevicesListComponent;
  let fixture: ComponentFixture<PersonalMonitoringDevicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalMonitoringDevicesListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalMonitoringDevicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
