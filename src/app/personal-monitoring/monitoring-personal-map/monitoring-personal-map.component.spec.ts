import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonalMonitoringMapComponent} from './monitoring-personal-map.component';

xdescribe('PersonalMonitoringMapComponent', () => {
  let component: PersonalMonitoringMapComponent;
  let fixture: ComponentFixture<PersonalMonitoringMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalMonitoringMapComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalMonitoringMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
