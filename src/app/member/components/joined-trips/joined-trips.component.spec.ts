import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedTripsComponent } from './joined-trips.component';

describe('JoinedTripsComponent', () => {
  let component: JoinedTripsComponent;
  let fixture: ComponentFixture<JoinedTripsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinedTripsComponent]
    });
    fixture = TestBed.createComponent(JoinedTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
