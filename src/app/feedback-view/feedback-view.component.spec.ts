import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackViewComponent } from './feedback-view.component';

describe('FeedbackViewComponent', () => {
  let component: FeedbackViewComponent;
  let fixture: ComponentFixture<FeedbackViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackViewComponent]
    });
    fixture = TestBed.createComponent(FeedbackViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
