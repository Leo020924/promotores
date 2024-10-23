import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportesIncidenciasPage } from './reportes-incidencias.page';

const routes: Routes = [
  {
    path: '',
    component: ReportesIncidenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesIncidenciasPageRoutingModule {}
