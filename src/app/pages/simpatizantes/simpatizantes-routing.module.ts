import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimpatizantesPage } from './simpatizantes.page';

const routes: Routes = [
  {
    path: '',
    component: SimpatizantesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimpatizantesPageRoutingModule {}
