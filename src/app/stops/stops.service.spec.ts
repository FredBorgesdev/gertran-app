import {TestBed} from '@angular/core/testing';

import {StopsService} from './stops.service';

xdescribe('StopsService', () => {
  let service: StopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
