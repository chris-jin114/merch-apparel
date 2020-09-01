import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  errorType: BehaviorSubject<string>;
  errorMsg: BehaviorSubject<string>;

  constructor() {
    this.errorType = new BehaviorSubject(null);
    this.errorMsg = new BehaviorSubject('');
  }

  getErrorType() {
    return this.errorType.asObservable();
  }

  setErrorMsg(msg) {
    this.errorMsg.next(msg);
  }

  getErrorMsg() {
    return this.errorMsg.asObservable();
  }
}
