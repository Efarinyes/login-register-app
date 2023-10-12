import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isAuhenticatedGuard } from './is-auhenticated.guard';

describe('isAuhenticatedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isAuhenticatedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
