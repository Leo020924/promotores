import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'reportes-incidencias',
    loadChildren: () => import('./pages/reportes-incidencias/reportes-incidencias.module').then( m => m.ReportesIncidenciasPageModule)
  },
  {
    path: 'bitacora-actividades',
    loadChildren: () => import('./pages/bitacora-actividades/bitacora-actividades.module').then( m => m.BitacoraActividadesPageModule)
  },
  {
    path: 'comites',
    loadChildren: () => import('./pages/comites/comites.module').then( m => m.ComitesPageModule)
  },
  {
    path: 'lideres-simpatizantes',
    loadChildren: () => import('./pages/lideres-simpatizantes/lideres-simpatizantes.module').then( m => m.LideresSimpatizantesPageModule)
  },
  {
    path: 'coordinadores',
    loadChildren: () => import('./pages/coordinadores/coordinadores.module').then( m => m.CoordinadoresPageModule)
  },
  {
    path: 'simpatizantes',
    loadChildren: () => import('./pages/simpatizantes/simpatizantes.module').then( m => m.SimpatizantesPageModule)
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }