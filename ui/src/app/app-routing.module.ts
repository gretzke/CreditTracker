import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditsComponent } from './credits/credits.component';
import { CreditDetailsComponent } from './credit-details/credit-details.component';
import { CdosComponent } from './cdos/cdos.component';

const routes: Routes = [
  {
    path: '',
    component: CreditsComponent
  },
  {
    path: 'credits/:id',
    component: CreditDetailsComponent
  },
  {
    path: 'cdos',
    component: CdosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
