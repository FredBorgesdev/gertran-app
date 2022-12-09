import { TestBed } from '@angular/core/testing';

import { SelectableVehicleManufacturersService } from './selectable-vehicle-manufacturers.service';

describe('SelectableVehicleManufacturersService', () => {
  let service: SelectableVehicleManufacturersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectableVehicleManufacturersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
