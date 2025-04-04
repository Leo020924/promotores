import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComitesPage } from './comites.page';

const routes: Routes = [
  {
    path: '',
    component: ComitesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComitesPageRoutingModule {}
