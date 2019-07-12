import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCardComponent } from './add-card/add-card.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { GetCardComponent } from './get-cards/get-card.component';
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {
    path: 'card/create',
    component: AddCardComponent
  },
  {
    path: 'card/edit/:id',
    component: EditCardComponent
  },
  {
    path: 'card',
    component: GetCardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
