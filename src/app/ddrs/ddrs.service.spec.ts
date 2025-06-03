import {TestBed} from '@angular/core/testing';

import {DdrsService} from './ddrs.service';

xdescribe('DdrsService', () => {
  let service: DdrsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DdrsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
