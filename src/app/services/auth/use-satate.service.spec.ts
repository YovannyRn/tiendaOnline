import { TestBed } from '@angular/core/testing';

import { UseSatateService } from './use-satate.service';

describe('UseSatateService', () => {
  let service: UseSatateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseSatateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
