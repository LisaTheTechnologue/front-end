import { TestBed } from '@angular/core/testing';

import { MemberFeedbackService } from './member-feedback.service';

describe('MemberFeedbackService', () => {
  let service: MemberFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
