/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MemberCommentService } from './member-comment.service';

describe('Service: MemberComment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberCommentService]
    });
  });

  it('should ...', inject([MemberCommentService], (service: MemberCommentService) => {
    expect(service).toBeTruthy();
  }));
});
