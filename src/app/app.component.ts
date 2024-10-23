import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private router: Router,private menu: MenuController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('hybrid')) {
        // Configura el estilo de la barra de estado
        StatusBar.setStyle({ style: Style.Light });
      } else {
        console.warn('StatusBar no soportado en la web');
      }
    });
  }

  logout() {
    // Aquí puedes agregar la lógica para cerrar sesión, como limpiar tokens, etc.
    // Luego redirige al usuario a la página de inicio de sesión o cualquier otra página
    this.router.navigate(['/login']);
  }

  selectOption(option: string) {
    // Aquí puedes manejar la lógica de navegación o cualquier otra acción
    console.log('Opción seleccionada:', option);

    // Cerrar el menú
    this.menu.close('first'); // Asegúrate de que el ID coincida
  }
}
