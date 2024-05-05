import { TestBed } from '@angular/core/testing';

import { MemberChatService } from './member-chat.service';

describe('MemberChatService', () => {
  let service: MemberChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
