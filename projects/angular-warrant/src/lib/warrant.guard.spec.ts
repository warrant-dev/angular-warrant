import { TestBed } from '@angular/core/testing';

import { WarrantGuard } from './warrant.guard';

describe('WarrantGuard', () => {
  let guard: WarrantGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WarrantGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
