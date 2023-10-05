import { TestBed } from '@angular/core/testing';

import { DBlocalService } from './dblocal.service';

describe('DBlocalService', () => {
  let service: DBlocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DBlocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
