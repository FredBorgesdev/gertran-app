import {TestBed} from '@angular/core/testing';

import {SelectableTruckService} from './selectable-truck.service';

xdescribe('SelectableTruckService', () => {
  let service: SelectableTruckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectableTruckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
