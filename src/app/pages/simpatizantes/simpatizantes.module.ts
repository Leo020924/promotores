import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimpatizantesPageRoutingModule } from './simpatizantes-routing.module';

import { SimpatizantesPage } from './simpatizantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimpatizantesPageRoutingModule
  ],
  declarations: [SimpatizantesPage]
})
export class SimpatizantesPageModule {}
