import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCardComponent } from './add-card/add-card.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { GetCardComponent } from './get-cards/get-card.component';
import {LoginComponent} from "./login/login.component";
import {RegisterUserComponent} from "./register-user/register-user.component";
import { AuthGuard } from './_guards/auth.guard';
import {AddDeckComponent} from "./add-deck/add-deck.component";
import {GetDecksComponent} from "./get-decks/get-decks.component";

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
    path: 'card/create',
    component: AddCardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'card/edit/:id',
    component: EditCardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'card',
    component: GetCardComponent,
    canActivate: [AuthGuard]
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
