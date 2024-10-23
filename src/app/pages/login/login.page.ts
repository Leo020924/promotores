import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any = 'leonardovazquez@gmail.com';
  password: any = '12345678';
  estilo: string = "none";

  constructor(private navCtrl: NavController, private http: HttpClient,private authService: AuthService,private alertController: AlertController) { }

  ngOnInit() {
  }

  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'El usuario o la contraseña son incorrectos',
      message: message,
      buttons: ['Volver a intentar'],
    });

    await alert.present();
  }


  async iniciar_sesion() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        // El `tap` en el servicio ya maneja la navegación y almacenamiento del token
        if (response['message'] === 'Invalid credentials') {
          this.estilo = "block";
        } else {
          this.estilo = "none";
        }
      },
      error => {
        console.log('Error status:', error.status);
        this.showErrorAlert("Usuario o contraseña incorrectos");
        this.estilo = "block";
        if (error.error) {
          console.error('Error details:', error.error.message || 'No message');
        }
      }
    );
  }


  /* async iniciar_sesion() {
    this.authService.login(this.usuario, this.contra).subscribe(
      response => {
        // El `tap` en el servicio ya maneja la navegación y almacenamiento del token
        if (response['message'] === 'Invalid credentials') {
          this.estilo = "block";
        } else {
          this.estilo = "none";
        }
      },
      error => {
        console.log('Error status:', error.status);
        console.log('Error message:', error.message);
        this.estilo = "block";
        if (error.error) {
          console.error('Error details:', error.error.message || 'No message');
        }
      }
    );
  } */

}
