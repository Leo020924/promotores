import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LideresSimpatizantesPage } from './lideres-simpatizantes.page';

const routes: Routes = [
  {
    path: '',
    component: LideresSimpatizantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LideresSimpatizantesPageRoutingModule {}
