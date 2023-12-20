import {TestBed} from '@angular/core/testing';

import {PersonalMonitoringService} from './personal-monitoring.service';

xdescribe('PersonalMonitoringService', () => {
  let service: PersonalMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
