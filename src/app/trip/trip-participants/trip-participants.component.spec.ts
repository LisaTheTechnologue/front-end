import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripParticipantsComponent } from './trip-participants.component';

describe('TripParticipantsComponent', () => {
  let component: TripParticipantsComponent;
  let fixture: ComponentFixture<TripParticipantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripParticipantsComponent]
    });
    fixture = TestBed.createComponent(TripParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
