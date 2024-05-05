import { TestBed } from '@angular/core/testing';

import { MemberTripService } from './member-trip.service';

describe('MemberTripService', () => {
  let service: MemberTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
