import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
@Injectable() export class ConfirmDialogService {
  private subject = new Subject<any>();
  constructor() { }
  confirmThis(title: string, message: string, yesFn: () => void, noFn: () => void) {
    this.setConfirmation(title, message, yesFn, noFn);
  }
  setConfirmation(title: string, message: string, yesFn: () => void, noFn: () => void) {
    let that = this;
    this.subject.next({
      type: "confirm",
      text: message,
      title: title,
      siFn:
        function () {
          that.subject.next(); //this will close the modal
          yesFn();
        },
      noFn: function () {
        that.subject.next();
        noFn();
      }
    });

  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
