import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AppHeaderComponent } from './app-header/app-header.component'; // Importa el nuevo componente
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { ReportesIncidenciasPage } from './pages/reportes-incidencias/reportes-incidencias.page';
import { BitacoraActividadesPage } from './pages/bitacora-actividades/bitacora-actividades.page';
import { ComitesPage } from './pages/comites/comites.page';

@NgModule({
  declarations: [AppComponent, AppHeaderComponent, ReportesIncidenciasPage,BitacoraActividadesPage,ComitesPage ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule, // Importa ReactiveFormsModule aquí
    FormsModule, // Importa FormsModule aquí
    HttpClientModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}


