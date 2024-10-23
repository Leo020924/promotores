import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoordinadoresPage } from './coordinadores.page';

const routes: Routes = [
  {
    path: '',
    component: CoordinadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoordinadoresPageRoutingModule {}
