import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCardComponent } from './add-card/add-card.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import {LoginComponent} from './login/login.component';
import {RegisterUserComponent} from './register-user/register-user.component';
import { AuthGuard } from './_guards/auth.guard';
import {AddDeckComponent} from './add-deck/add-deck.component';
import {GetDecksComponent} from './get-decks/get-decks.component';
import {ShowDeckComponent} from './show-deck/show-deck.component';
import {StudyCardsComponent} from './study-cards/study-cards.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: 'decks/add',
    component: AddDeckComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'decks/all',
    component: GetDecksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'study/:id',
    component: StudyCardsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'decks/show/:id',
    component: ShowDeckComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'card/edit/:id',
    component: EditCardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'card/add/:id',
    component: AddCardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterUserComponent
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
