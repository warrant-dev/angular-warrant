import { TestBed } from '@angular/core/testing';

import { WarrantService } from './warrant.service';

describe('WarrantService', () => {
  let service: WarrantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarrantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
