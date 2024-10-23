import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ComiteServiceService } from 'src/app/services/comite-service.service';
import { AlertController, NavController } from '@ionic/angular';



@Component({
  selector: 'app-comites',
  templateUrl: './comites.page.html',
  styleUrls: ['./comites.page.scss'],
})
export class ComitesPage implements OnInit {
  comiteForm: FormGroup;
  cpError: boolean = false;
  colonias: any[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder,private authService: AuthService,private http: HttpClient, private comiteService : ComiteServiceService, private alertController: AlertController,
    private fb: FormBuilder,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.comiteForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      cp: ['', Validators.required],
      municipio: ['', Validators.required],
      id_municipio: ['', Validators.required],
      colonia: ['', Validators.required],
      seccion: ['', Validators.required],
    });

    this.comiteForm.get('cp').valueChanges.subscribe((cp) => {
      this.actualizarCp();
    });
  }

  async onSubmit() {
   /*  const formData = new FormData();
  
    // Agregar otros campos del formulario
    formData.append('nombre', this.comiteForm.value.nombre);
    formData.append('descripcion', this.comiteForm.value.descripcion);
    formData.append('tipo', this.comiteForm.value.tipo);
    formData.append('cp', this.comiteForm.value.cp);
    formData.append('municipio', this.comiteForm.value.municipio);
    formData.append('id_municipio', this.comiteForm.value.id_municipio);
    formData.append('colonia', this.comiteForm.value.colonia);
    formData.append('seccion', this.comiteForm.value.seccion); */
    const params = this.comiteForm.value;

    console.log(this.comiteForm.valid);
  
    if (this.comiteForm.valid) {
      this.comiteService.sendReport(params).subscribe(
        async (response) => {
          console.log('Comité registrado con éxito:', response);
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'El comité se ha registrado correctamente.',
            buttons: [
              {
                text: 'Aceptar',
                handler: () => {
                  // Navega a otra vista, por ejemplo 'cuestionarios-usuario'
                  this.navCtrl.navigateRoot('/home');
                },
              },
            ],
          });
          await alert.present(); // Muestra la alerta
        },
        (error) => {
          console.error('Error al enviar el reporte:', error);
          // Manejar el error
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

  
  logout() {
    // Aquí puedes agregar la lógica para cerrar sesión, como limpiar tokens, etc.
    // Luego redirige al usuario a la página de inicio de sesión o cualquier otra página
    this.router.navigate(['/login']);
  }


  actualizarCp() {
    const cp = this.comiteForm.get('cp').value;
    const token = this.authService.getToken();
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
  
    if (cp.length === 5) {
      this.http.get<any[]>(`https://sandbox.macgto.com/api/colonias/${cp}`, { headers })
        .subscribe(
          (data) => {
            const coloniaSelect = this.comiteForm.get('colonia');
            const municipioInput = this.comiteForm.get('municipio');
            const municipioIdInput = this.comiteForm.get('id_municipio');
            console.log(cp);
            this.cpError = false; // Resetear error
            this.colonias = []; // Limpiar el array de colonias antes de llenarlo
  
            if (data.length > 0) {
              console.log(data[0].municipio.nombre);
              municipioInput.setValue(data[0].municipio.nombre);
              municipioIdInput.setValue(data[0].municipio.id);
              municipioInput.disable();
              
              // Almacenar colonias en el array
              this.colonias = data;
              console.log(data);
  
              // Asegúrate de que colonias se actualiza correctamente
              coloniaSelect.setValue(data[0].asentamiento); // Cambia a `asentamiento` según tu respuesta
            } else {
              this.cpError = true;
              municipioInput.setValue('');
              municipioIdInput.setValue('');
            }
          },
          (error) => {
            console.error('Error al obtener datos:', error);
            this.cpError = true;
          }
        );
    } else {
      this.comiteForm.get('colonia').setValue('');
      this.cpError = false;
      this.comiteForm.get('municipio').setValue('');
      this.comiteForm.get('id_municipio').setValue('');
    }
  }


  validateInput(event: any) {
    const input = event.target.value;
    // Solo permite números
    const filteredInput = input.replace(/[^0-9]/g, '');

    // Limita a 5 caracteres
    if (filteredInput.length > 5) {
      event.target.value = filteredInput.slice(0, 5);
    } else {
      event.target.value = filteredInput;
    }
  }

}
