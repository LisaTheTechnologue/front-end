import { TestBed } from '@angular/core/testing';

import { TripParticipantsService } from '../_shared/services/trip-participants.service';

describe('TripParticipantsService', () => {
  let service: TripParticipantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripParticipantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
