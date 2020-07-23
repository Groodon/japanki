import {Component, OnInit} from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { AuthenticationService } from './_services';
import { User } from './_models';

import { NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router } from '@angular/router';
import {AuthService} from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'japanki';
  currentUser: User;
  user = '';
  returnUrl: string;
  error: string;
  loading: boolean;


  constructor(
    private loadingBar: SlimLoadingBarService,
    private router: Router,
    public authenticationService: AuthenticationService,
    private authService: AuthService) {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this.loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this.loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this.loadingBar.stop();
    }
  }

  // Returns false to not redirect to href, as seen in html file.
  logout() {
    this.authenticationService.logout();
    this.authService.signOut();
    this.router.navigate(['']);
    return false;
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      this.authenticationService.login(user.idToken).pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['']);
          },
          error => {
            console.log(error);
            this.error = error;
            this.loading = false;
          });
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  ngOnInit() {

  }
}
