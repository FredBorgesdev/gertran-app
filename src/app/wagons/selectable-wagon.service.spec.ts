import { TestBed } from '@angular/core/testing';

import { SelectableWagonService } from './selectable-wagon.service';

describe('SelectableWagonService', () => {
  let service: SelectableWagonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectableWagonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
