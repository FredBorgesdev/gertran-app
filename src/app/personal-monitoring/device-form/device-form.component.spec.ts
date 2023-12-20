import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonalMonitoringFormComponent} from './device-form.component';

xdescribe('InsuranceCompaniesFormComponent', () => {
  let component: PersonalMonitoringFormComponent;
  let fixture: ComponentFixture<PersonalMonitoringFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalMonitoringFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalMonitoringFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
