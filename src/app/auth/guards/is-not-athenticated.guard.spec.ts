import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isNotAthenticatedGuard } from './is-not-athenticated.guard';

describe('isNotAthenticatedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isNotAthenticatedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
