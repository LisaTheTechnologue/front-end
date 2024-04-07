import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private isJoined = new BehaviorSubject(false);
  getIsJoined = this.isJoined.asObservable();

  constructor() { }

  setIsJoined(isJoined: boolean){
    this.isJoined.next(isJoined)
  }
}
