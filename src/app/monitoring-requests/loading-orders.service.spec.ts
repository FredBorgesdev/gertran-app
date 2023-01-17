import {TestBed} from '@angular/core/testing';

import {LoadingOrdersService} from './loading-orders.service';

xdescribe('LoadingOrdersService', () => {
  let service: LoadingOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
