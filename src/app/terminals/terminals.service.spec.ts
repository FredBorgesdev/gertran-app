import {TestBed} from '@angular/core/testing';

import {TerminalsService} from './terminals.service';

xdescribe('TerminalsService', () => {
  let service: TerminalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
