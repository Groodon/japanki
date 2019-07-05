import {Injectable, OnInit} from '@angular/core';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser} from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {
  constructor(private authService: AuthService) {
    this.authService.authState.subscribe((user) => {
      console.log("LOGGED IN WITH ", user);
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  private user: SocialUser;
  private loggedIn: boolean;

  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    console.log("LOGGED IN WITH ", this.user);
  }

  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut() {
    this.authService.signOut();
    this.user = null;
    this.loggedIn = false;
  }

  public get currentUserValue() {
    return this.user;
  }

  public get currentlyLoggedIn() {
    return this.loggedIn;
  }
}
