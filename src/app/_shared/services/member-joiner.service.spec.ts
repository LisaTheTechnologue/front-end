import { TestBed } from '@angular/core/testing';

import { MemberJoinerService } from './member-joiner.service';

describe('MemberJoinerService', () => {
  let service: MemberJoinerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberJoinerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
