import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackCreateComponent } from './feedback-create.component';

describe('FeedbackCreateComponent', () => {
  let component: FeedbackCreateComponent;
  let fixture: ComponentFixture<FeedbackCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackCreateComponent]
    });
    fixture = TestBed.createComponent(FeedbackCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
