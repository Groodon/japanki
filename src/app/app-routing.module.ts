import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCardComponent } from './add-card/add-card.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { GetCardComponent } from './get-cards/get-card.component';

const routes: Routes = [
  {
    path: 'business/create',
    component: AddCardComponent
  },
  {
    path: 'business/edit/:id',
    component: EditCardComponent
  },
  {
    path: 'business',
    component: GetCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
