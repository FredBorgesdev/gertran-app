import {TestBed} from '@angular/core/testing';

import {ChecklistsService} from './checklists.service';

xdescribe('ChecklistsService', () => {
  let service: ChecklistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
