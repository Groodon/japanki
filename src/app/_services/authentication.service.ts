// Used to login and logout of the application

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get isLoggedIn(): boolean {
    console.log("this", this.currentUserSubject)
    return this.currentUserSubject.value != null;
  }

  // posts the user credentials to the api and checks the response for a JWT token
  login(email: string, password: string) {
    return this.http.post<any>(`users/authenticate`, { email, password })
      .pipe(map(user => {
        // User is the response we got from the post call
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // Store the token in cookie to prevent XSS attacks
          this.cookieService.set('currentToken', JSON.stringify((user.token)));
          delete user.token;
          localStorage.setItem('currentUser', JSON.stringify(user));
          // 'next' provides data, sets the value to user
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  // posts the user credentials to the api and checks the response for a JWT token
  login2(token: string) {
    return this.http.post<any>(`users/login`, { token })
      .pipe(map(user => {
        // User is the response we got from the post call
        // login successful if there's a jwt token in the response
        console.log("asdasd", user)
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // Store the token in cookie to prevent XSS attacks
          this.cookieService.set('currentToken', JSON.stringify((user.token)));
          localStorage.setItem('currentUser', JSON.stringify(user.token));
          // 'next' provides data, sets the value to user
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.cookieService.delete('currentToken');
    this.currentUserSubject.next(null);
  }

  registerUser(username: string, password: string, email: string) {
    return this
      .http
      .post<any>(`users/register`, {username, password, email})

  }
}
