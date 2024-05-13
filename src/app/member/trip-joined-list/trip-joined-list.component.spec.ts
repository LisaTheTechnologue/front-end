import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripJoinedListComponent } from './trip-joined-list.component';

describe('TripJoinedListComponent', () => {
  let component: TripJoinedListComponent;
  let fixture: ComponentFixture<TripJoinedListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripJoinedListComponent]
    });
    fixture = TestBed.createComponent(TripJoinedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
