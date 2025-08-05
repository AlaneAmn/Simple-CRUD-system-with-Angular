import { TestBed } from '@angular/core/testing';

import { Associate } from './associate';

describe('Associate', () => {
  let service: Associate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Associate);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
