import { TestBed } from '@angular/core/testing';

import { LoadingOrdersService } from './loading-orders.service';

describe('LoadingOrdersService', () => {
  let service: LoadingOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
