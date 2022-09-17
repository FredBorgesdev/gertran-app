import { TestBed } from '@angular/core/testing';

import { WagonsService } from './wagons.service';

describe('WagonsService', () => {
  let service: WagonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WagonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
