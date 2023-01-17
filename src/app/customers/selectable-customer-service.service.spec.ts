import {TestBed} from '@angular/core/testing';

import {SelectableCustomerServiceService} from './selectable-customer-service.service';

xdescribe('SelectableCustomerServiceService', () => {
  let service: SelectableCustomerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectableCustomerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
