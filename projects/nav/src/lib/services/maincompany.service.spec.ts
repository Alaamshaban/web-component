import { TestBed, inject } from '@angular/core/testing';

import { MaincompanyService } from './maincompany.service';

describe('MaincompanyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaincompanyService = TestBed.inject(MaincompanyService);
    expect(service).toBeTruthy();
  });
});
