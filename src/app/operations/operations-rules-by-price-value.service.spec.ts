import { TestBed } from '@angular/core/testing';

import { OperationsRulesByPriceValueService } from './operations-rules-by-price-value.service';

describe('OperationsRulesByPriceValueService', () => {
  let service: OperationsRulesByPriceValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationsRulesByPriceValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
