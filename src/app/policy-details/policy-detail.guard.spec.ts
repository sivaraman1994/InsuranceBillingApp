import { TestBed } from '@angular/core/testing';

import { PolicyDetailGuard } from './policy-detail.guard';

describe('ProductDetailGuard', () => {
  let guard: PolicyDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PolicyDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
