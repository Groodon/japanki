// Used to login and logout of the application

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get isLoggedIn(): boolean {
    return this.currentUserSubject.value != null;
  }

  // posts the user credentials to the api and checks the response for a JWT token
  login(username: string, password: string) {
    return this.http.post<any>(`users/authenticate`, { username, password })
      .pipe(map(user => {
        // User is the response we got from the post call
        // login successful if there's a jwt token in the response
        console.log(user);
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          // 'next' provides data, sets the value to user
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  registerUser(username: string, password: string, email: string) {
    this
      .http
      .post(`users/register`, {username, password, email})
      .subscribe(res => console.log('Registered!'),
        error => console.log(error));
  }
}
