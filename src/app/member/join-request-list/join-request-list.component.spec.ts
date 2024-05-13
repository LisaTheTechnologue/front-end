import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinRequestListComponent } from './join-request-list.component';

describe('JoinRequestListComponent', () => {
  let component: JoinRequestListComponent;
  let fixture: ComponentFixture<JoinRequestListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinRequestListComponent]
    });
    fixture = TestBed.createComponent(JoinRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
