import { TestBed } from '@angular/core/testing';

import { MemberUserService } from './member-user.service';

describe('MemberUserService', () => {
  let service: MemberUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
