import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTripsViewComponent } from './profile-trips-view.component';

describe('ProfileTripsViewComponent', () => {
  let component: ProfileTripsViewComponent;
  let fixture: ComponentFixture<ProfileTripsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileTripsViewComponent]
    });
    fixture = TestBed.createComponent(ProfileTripsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
