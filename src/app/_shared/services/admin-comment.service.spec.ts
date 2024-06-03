/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminCommentService } from './admin-comment.service';

describe('Service: AdminComment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminCommentService]
    });
  });

  it('should ...', inject([AdminCommentService], (service: AdminCommentService) => {
    expect(service).toBeTruthy();
  }));
});
