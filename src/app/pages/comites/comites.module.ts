import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComitesPageRoutingModule } from './comites-routing.module';

import { ComitesPage } from './comites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComitesPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: []
})
export class ComitesPageModule {}
