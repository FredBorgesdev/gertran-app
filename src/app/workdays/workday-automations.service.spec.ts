import { TestBed } from '@angular/core/testing';

import { WorkdayAutomationsService } from './workday-automations.service';

describe('WorkdayAutomationsService', () => {
  let service: WorkdayAutomationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkdayAutomationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
