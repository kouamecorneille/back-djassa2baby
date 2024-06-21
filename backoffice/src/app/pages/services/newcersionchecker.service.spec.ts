import { TestBed } from '@angular/core/testing';

import { NewcersioncheckerService } from './newcersionchecker.service';

describe('NewcersioncheckerService', () => {
  let service: NewcersioncheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewcersioncheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
