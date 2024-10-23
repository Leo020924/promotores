import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent {
  constructor(private router: Router) {}

  logout() {
    // Aquí puedes agregar la lógica para cerrar sesión, como limpiar tokens, etc.
    // Luego redirige al usuario a la página de inicio de sesión o cualquier otra página
    this.router.navigate(['/login']);
  }
}

