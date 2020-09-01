import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterFacade {

  isOpenedNav = new BehaviorSubject<boolean>(false);

  constructor() {}

  setOpenedNav(val) {
    this.isOpenedNav.next(val);
  }
  getOpenedNav() {
    return this.isOpenedNav.asObservable();
  }
}
