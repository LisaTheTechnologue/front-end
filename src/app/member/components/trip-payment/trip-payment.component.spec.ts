import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPaymentComponent } from './trip-payment.component';

describe('TripPaymentComponent', () => {
  let component: TripPaymentComponent;
  let fixture: ComponentFixture<TripPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripPaymentComponent]
    });
    fixture = TestBed.createComponent(TripPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
