import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCreatedListComponent } from './trip-created-list.component';

describe('TripCreatedListComponent', () => {
  let component: TripCreatedListComponent;
  let fixture: ComponentFixture<TripCreatedListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripCreatedListComponent]
    });
    fixture = TestBed.createComponent(TripCreatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
