import { TestBed } from '@angular/core/testing';

import { MemberPaymentService } from './member-payment.service';

describe('MemberPaymentService', () => {
  let service: MemberPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
