import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { CardService } from './_services/card.service';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCardComponent } from './add-card/add-card.component';
import { EditCardComponent } from './edit-card/edit-card.component';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { SocialLoginModule } from "angularx-social-login";
import {ErrorInterceptor} from "./_helpers/error.interceptor";
import {JwtInterceptor} from "./_helpers/jwt.interceptors";
import {APIInterceptor} from "./_helpers/api.interceptor";
import { RegisterUserComponent } from './register-user/register-user.component';
import { AddDeckComponent } from './add-deck/add-deck.component';
import { GetDecksComponent } from './get-decks/get-decks.component';
import { ShowDeckComponent } from './show-deck/show-deck.component';
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {ConfirmDialogService} from "./confirm-dialog/confirm-dialog.service";



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
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
    CardService, ConfirmDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
