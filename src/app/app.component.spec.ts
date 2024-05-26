import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    const routerStub = () => ({
      events: { subscribe: f => f({}) },
      navigateByUrl: string => ({})
    });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent],
      providers: [{ provide: Router, useFactory: routerStub }]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`title has default value`, () => {
    expect(component.title).toEqual(`front-end`);
  });

  it(`year has default value`, () => {
    expect(component.year).toEqual(`2024`);
  });

  describe('logout', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      component.logout();
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
    });
  });
});
