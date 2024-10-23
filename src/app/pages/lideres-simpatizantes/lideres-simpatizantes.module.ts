import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LideresSimpatizantesPageRoutingModule } from './lideres-simpatizantes-routing.module';

import { LideresSimpatizantesPage } from './lideres-simpatizantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LideresSimpatizantesPageRoutingModule
  ],
  declarations: [LideresSimpatizantesPage]
})
export class LideresSimpatizantesPageModule {}
