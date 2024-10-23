import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lideres-simpatizantes',
  templateUrl: './lideres-simpatizantes.page.html',
  styleUrls: ['./lideres-simpatizantes.page.scss'],
})
export class LideresSimpatizantesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    // Aquí puedes agregar la lógica para cerrar sesión, como limpiar tokens, etc.
    // Luego redirige al usuario a la página de inicio de sesión o cualquier otra página
    this.router.navigate(['/login']);
  }

  navigateToCoordinadores() {
    this.router.navigate(['/coordinadores']);
  }

  navigateToSimpatizantes() {
    this.router.navigate(['/simpatizantes']);
  }

}
