import { TestBed } from '@angular/core/testing';

import { SelectableDriversService } from './selectable-drivers.service';

describe('SelectableDriversService', () => {
  let service: SelectableDriversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectableDriversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
