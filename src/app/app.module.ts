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
import { SocialLoginModule } from "angularx-social-login";
import {ErrorInterceptor} from "./_helpers/error.interceptor";
import {JwtInterceptor} from "./_helpers/jwt.interceptors";
import {APIInterceptor} from "./_helpers/api.interceptor";
import { RegisterUserComponent } from './register-user/register-user.component';
import { AddDeckComponent } from './add-deck/add-deck.component';
import { GetDecksComponent } from './get-decks/get-decks.component';



@NgModule({
  declarations: [
    AppComponent,
    AddCardComponent,
    GetCardComponent,
    EditCardComponent,
    LoginComponent,
    RegisterUserComponent,
    AddDeckComponent,
    GetDecksComponent
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
    CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
