import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BitacoraActividadesPage } from './bitacora-actividades.page';

const routes: Routes = [
  {
    path: '',
    component: BitacoraActividadesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BitacoraActividadesPageRoutingModule {}
