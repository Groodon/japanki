import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { CardService } from './card.service';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCardComponent } from './add-card/add-card.component';
import { GetCardComponent } from './get-cards/get-card.component';
import { EditCardComponent } from './edit-card/edit-card.component';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import {AuthenticationService} from "./authentication.service";
import {ErrorInterceptor} from "./_helpers/error.interceptor";
import {JwtInterceptor} from "./_helpers/jwt.interceptors";
import {APIInterceptor} from "./_helpers/api.interceptor";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("471391585101-8rhggm7ek2va7uqbula56oj2rn80b3ah.apps.googleusercontent.com")
  }
]);

// TODO: what is this?
let client_secret = "DldrG6PEogW7Bzz4O9aNHhMJ";

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    AddCardComponent,
    GetCardComponent,
    EditCardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
    CardService, {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  },
  AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
