import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CoordinadoresPageRoutingModule } from './coordinadores-routing.module';

import { CoordinadoresPage } from './coordinadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CoordinadoresPageRoutingModule
  ],
  declarations: [CoordinadoresPage]
})
export class CoordinadoresPageModule {}
