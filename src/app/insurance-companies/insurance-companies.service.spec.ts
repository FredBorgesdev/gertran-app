import { TestBed } from '@angular/core/testing';

import { InsuranceCompaniesService } from './insurance-companies.service';

describe('InsuranceCompaniesService', () => {
  let service: InsuranceCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
