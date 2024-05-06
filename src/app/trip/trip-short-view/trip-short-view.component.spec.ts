import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripShortViewComponent } from './trip-short-view.component';

describe('TripShortViewComponent', () => {
  let component: TripShortViewComponent;
  let fixture: ComponentFixture<TripShortViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripShortViewComponent]
    });
    fixture = TestBed.createComponent(TripShortViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
