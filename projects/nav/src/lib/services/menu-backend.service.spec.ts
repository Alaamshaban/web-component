import { TestBed, inject } from '@angular/core/testing';

import { MenuBackendService } from './menu-backend.service';

describe('MenuBackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuBackendService]
    });
  });

  it('should be created', inject([MenuBackendService], (service: MenuBackendService) => {
    expect(service).toBeTruthy();
  }));
});
