import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
<<<<<<< HEAD
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
=======
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
>>>>>>> origin/css-stuff

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { CardService } from './_services/card.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCardComponent } from './add-card/add-card.component';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { SocialLoginModule, AuthServiceConfig  } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {JwtInterceptor} from './_helpers/jwt.interceptors';
import {APIInterceptor} from './_helpers/api.interceptor';
import { AddDeckComponent } from './add-deck/add-deck.component';
import { GetDecksComponent } from './get-decks/get-decks.component';
import { ShowDeckComponent } from './show-deck/show-deck.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {ConfirmDialogService} from './confirm-dialog/confirm-dialog.service';
import { StudyCardsComponent } from './study-cards/study-cards.component';
import { IgxRadioModule } from 'igniteui-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CookieService} from 'ngx-cookie-service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HomeComponent } from './home/home.component';
import { DeckOptionsComponent } from './deck-options/deck-options.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { SharedDecksComponent } from './shared-decks/shared-decks.component';
import { UserSharedDecksComponent } from './user-shared-decks/user-shared-decks.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('471391585101-8rhggm7ek2va7uqbula56oj2rn80b3ah.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    AddCardComponent,
    AddDeckComponent,
    GetDecksComponent,
    ShowDeckComponent,
    ConfirmDialogComponent,
    StudyCardsComponent,
    HomeComponent,
    ConfirmationModalComponent,
    DeckOptionsComponent,
    SharedDecksComponent,
    UserSharedDecksComponent
  ],
  entryComponents: [
    ConfirmationModalComponent
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
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    MatSlideToggleModule,
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
