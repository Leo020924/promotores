import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportesIncidenciasPageRoutingModule } from './reportes-incidencias-routing.module';

import { ReportesIncidenciasPage } from './reportes-incidencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportesIncidenciasPageRoutingModule
  ],
  declarations: []
})
export class ReportesIncidenciasPageModule {}
