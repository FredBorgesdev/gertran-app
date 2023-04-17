import { TestBed } from '@angular/core/testing';

import { SelectablePointService } from './selectable-point.service';

describe('SelectablePointService', () => {
  let service: SelectablePointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectablePointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
