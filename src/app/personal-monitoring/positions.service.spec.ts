import {TestBed} from '@angular/core/testing';

import {PersonalPositionsService} from './positions.service';

xdescribe('PositionsService', () => {
  let service: PersonalPositionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalPositionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
