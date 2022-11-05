import { TestBed } from '@angular/core/testing';

import { SelectableUsersService } from './selectable-users.service';

describe('SelectableUsersService', () => {
  let service: SelectableUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectableUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
