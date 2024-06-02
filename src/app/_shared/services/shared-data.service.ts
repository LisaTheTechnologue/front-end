import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private data=null;

  setData(data: any) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

}
