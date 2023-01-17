import {TestBed} from '@angular/core/testing';

import {TerminalGroupsService} from './terminal-groups.service';

xdescribe('TerminalGroupsService', () => {
  let service: TerminalGroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminalGroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
