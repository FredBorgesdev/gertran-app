import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonalMonitoringListComponent} from './monitoring-personal-list.component';

xdescribe('PersonalMonitoringListComponent', () => {
  let component: PersonalMonitoringListComponent;
  let fixture: ComponentFixture<PersonalMonitoringListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalMonitoringListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalMonitoringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
