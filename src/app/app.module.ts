import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { CardService } from './_services/card.service';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCardComponent } from './add-card/add-card.component';
import { EditCardComponent } from './edit-card/edit-card.component';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { SocialLoginModule, AuthServiceConfig  } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

import {ErrorInterceptor} from "./_helpers/error.interceptor";
import {JwtInterceptor} from "./_helpers/jwt.interceptors";
import {APIInterceptor} from "./_helpers/api.interceptor";
import { RegisterUserComponent } from './register-user/register-user.component';
import { AddDeckComponent } from './add-deck/add-deck.component';
import { GetDecksComponent } from './get-decks/get-decks.component';
import { ShowDeckComponent } from './show-deck/show-deck.component';
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {ConfirmDialogService} from "./confirm-dialog/confirm-dialog.service";
import { StudyCardsComponent } from './study-cards/study-cards.component';
import { IgxRadioModule } from 'igniteui-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CookieService} from "ngx-cookie-service";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("471391585101-8rhggm7ek2va7uqbula56oj2rn80b3ah.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("Facebook-App-Id")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    AddCardComponent,
    EditCardComponent,
    LoginComponent,
    RegisterUserComponent,
    AddDeckComponent,
    GetDecksComponent,
    ShowDeckComponent,
    ConfirmDialogComponent,
    StudyCardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    IgxRadioModule,
    FormsModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    CookieService, CardService, ConfirmDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
