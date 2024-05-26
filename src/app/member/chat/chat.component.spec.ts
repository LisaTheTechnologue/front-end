import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MemberChatService } from 'src/app/_shared/services/member-chat.service';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat.component';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({});
    const routerStub = () => ({ navigate: array => ({}) });
    const memberChatServiceStub = () => ({
      get: tripId => ({ subscribe: f => f({}) }),
      create: object => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ChatComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: MemberChatService, useFactory: memberChatServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`messages has default value`, () => {
    expect(component.messages).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getChat').and.callThrough();
      component.ngOnInit();
      expect(component.getChat).toHaveBeenCalled();
    });
  });

  describe('getChat', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const memberChatServiceStub: MemberChatService = fixture.debugElement.injector.get(
        MemberChatService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(memberChatServiceStub, 'get').and.callThrough();
      component.getChat();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(memberChatServiceStub.get).toHaveBeenCalled();
    });
  });
});
