import {TestBed} from '@angular/core/testing';

import {VehiclesService} from './vehicles.service';

xdescribe('VehiclesService', () => {
  let service: VehiclesService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
