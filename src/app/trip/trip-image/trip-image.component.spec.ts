import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripImageComponent } from './trip-image.component';

describe('TripImageComponent', () => {
  let component: TripImageComponent;
  let fixture: ComponentFixture<TripImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripImageComponent]
    });
    fixture = TestBed.createComponent(TripImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
