import { TestBed } from '@angular/core/testing';

import { AdminTripService } from './admin-trip.service';

describe('AdminTripService', () => {
  let service: AdminTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
