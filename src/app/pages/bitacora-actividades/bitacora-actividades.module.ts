import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BitacoraActividadesPageRoutingModule } from './bitacora-actividades-routing.module';

import { BitacoraActividadesPage } from './bitacora-actividades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BitacoraActividadesPageRoutingModule
  ]
})
export class BitacoraActividadesPageModule {}
