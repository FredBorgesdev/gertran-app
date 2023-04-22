import { TestBed } from '@angular/core/testing';

import { SelectableVehicleModelService } from './selectable-vehicle-model.service';

describe('SelectableVehicleModelService', () => {
  let service: SelectableVehicleModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectableVehicleModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
