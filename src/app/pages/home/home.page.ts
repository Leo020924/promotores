import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private router: Router,  private authService: AuthService, private http: HttpClient,private navCtrl: NavController) { }

  bitacorasInfo: any[] = [];
  bitacoras: number = 0;
  incidencias: number = 0;

  ngOnInit() {
   /*  this.cargarbitacoras();
    this.cargarIncidencias();
    this.cargarbitacorasInfo(); */
  }

  logout() {
    // Aquí puedes agregar la lógica para cerrar sesión, como limpiar tokens, etc.
    // Luego redirige al usuario a la página de inicio de sesión o cualquier otra página
    this.router.navigate(['/login']);
  }

  
  /* cargarbitacoras(){
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    this.http.get<any[]>('https://sandbox.macgto.com/api/bitacoras',{headers}).subscribe(data => {
      this.bitacoras = data.length; // Suponiendo que la respuesta es un array de tipos
  })
  }

  cargarIncidencias(){
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    this.http.get<any[]>('https://sandbox.macgto.com/api/incidencias',{headers}).subscribe(data => {
      this.incidencias = data.length; // Suponiendo que la respuesta es un array de tipos
  })
  }

  cargarbitacorasInfo(){
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    this.http.get<any[]>('https://sandbox.macgto.com/api/bitacoras',{headers}).subscribe(data => {
      this.bitacorasInfo = data; // Suponiendo que la respuesta es un array de tipos
  })
  } */

  irALevantamiento() {
    this.navCtrl.navigateForward('/reportes-incidencias');
  }

  irABitacoras() {
    this.navCtrl.navigateForward('/bitacora-actividades');
  }

  irARegistroComites() {
    this.navCtrl.navigateForward('/comites');
  }

  irADeteccionLideres() {
    this.navCtrl.navigateForward('/lideres-simpatizantes');
  }


}
