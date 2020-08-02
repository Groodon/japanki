import { ThemeService } from './_services/theme.service';
import {Component, OnInit} from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { AuthenticationService } from './_services';
import { UserService } from "./_services/user.service";
import { DeckService } from "./_services/deck.service";
import { User } from './_models';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';

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
  darkMode: boolean = true;

  constructor(
    private loadingBar: SlimLoadingBarService,
    private router: Router,
    public authenticationService: AuthenticationService,
    private authService: AuthService,
    private userService: UserService,
    private deckService: DeckService,
    private themeService: ThemeService, 
    private cookieService: CookieService) {
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

  changeTheme() {
    if (this.darkMode) {
      this.setThemeCookie("1");
      this.themeService.setDarkTheme();
    } else {
      this.setThemeCookie("0");
      this.themeService.setLightTheme();
    }
  }

  setThemeCookie(cookie: string) {
    this.cookieService.set('darkMode', cookie, 1, '/', null, false, "Lax");
  }

  setThemeForUser() {
    const darkMode = this.cookieService.get('darkMode');
    if (darkMode == "1") {
      this.darkMode = true;
      this.themeService.setDarkTheme();
    } else {
      this.darkMode = false;
      this.themeService.setLightTheme();
    }
  }

  ngOnInit() {
    this.setThemeForUser();
    this.authenticationService.currentUser.subscribe(user => {
      // When user changed (when starting app and when logging in/out)
      // Get user info of last_login
      // last_login is a string with the time
      if (user !== null) {
        this.userService.getUser().subscribe(currentUser => {
          const now = moment().startOf('day');
          if (now > moment(currentUser.last_login)) {
            this.userService.updateUser({last_login: now.format('YYYY-MM-DD[T]HH:mm:ss').toString()}).subscribe(() => {
              this.deckService.updateDecks({new_studied: 0, rep_studied: 0}).subscribe();
            })
          }
        })
      }
    })
  }
}
