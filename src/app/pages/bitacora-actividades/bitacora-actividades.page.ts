import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ReportesService } from 'src/app/services/reportes-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { BitacorasService } from 'src/app/services/bitacoras-service.service';

@Component({
  selector: 'app-bitacora-actividades',
  templateUrl: './bitacora-actividades.page.html',
  styleUrls: ['./bitacora-actividades.page.scss'],
})
export class BitacoraActividadesPage implements OnInit {
  cpError: boolean = false;
  colonias: any[] = [];
  reportForm: FormGroup;
  location = { lat: null, lng: null };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private bitacoraService: BitacorasService,
    private http: HttpClient
  ) {}

  getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.location.lat = position.coords.latitude;
            this.location.lng = position.coords.longitude;
            console.log('Ubicación obtenida:', this.location);
            resolve;
          },
          (error) => {
            console.error('Error obteniendo la ubicación', error);
            this.location = { lat: null, lng: null };
            reject(error);
          }
        );
      } else {
        console.log('Geolocalización no es soportada por este navegador.');
        reject('Geolocalización no soportada');
      }
    });
  }

  async ngOnInit() {
    this.reportForm = this.formBuilder.group({
      actividad: ['', Validators.required],
      descripcion: ['', Validators.required],
      comentarios: ['', Validators.required],
      cp: ['', Validators.required],
      colonia: ['', Validators.required],
      seccion: ['', Validators.required],
      municipio: ['', Validators.required],
      id_municipio: ['', Validators.required],
    });

    this.reportForm.get('cp').valueChanges.subscribe((cp) => {
      this.actualizarCp();
    });

    this.getLocation();
  }

  logout() {
    // Aquí puedes agregar la lógica para cerrar sesión, como limpiar tokens, etc.
    // Luego redirige al usuario a la página de inicio de sesión o cualquier otra página
    this.router.navigate(['/login']);
  }

  async onSubmit() {
    /*  const formData = new FormData();

    // Agregar otros campos del formulario
    formData.append('actividad', this.reportForm.value.actividad);
    formData.append('descripcion', this.reportForm.value.descripcion);
    formData.append('comentarios', this.reportForm.value.comentarios);
    formData.append('cp', this.reportForm.value.cp);
    formData.append('id_municipio', this.reportForm.value.id_municipio);
    formData.append('colonia', this.reportForm.value.colonia);
    formData.append('seccion', this.reportForm.value.seccion);
    formData.append('latitud', this.location.lat);
    formData.append('longitud', this.location.lng);


    // Imprimir el contenido del FormData
// Imprimir el contenido del FormData usando forEach
formData.forEach((value, key) => {
  console.log(key,value);
}); */
    const params = {
      'actividad':this.reportForm.value.actividad,
      'descripcion':this.reportForm.value.descripcion,
      'comentarios':this.reportForm.value.comentarios,
      'cp':this.reportForm.value.cp,
      'id_municipio':this.reportForm.value.id_municipio,
      'colonia':this.reportForm.value.colonia,
      'seccion':this.reportForm.value.seccion,
      'latitud':this.location.lat.toString(),
      'longitud':this.location.lng.toString()
    };

    if (this.reportForm.valid) {
      this.bitacoraService.sendReport(params).subscribe(
        async (response) => {
          console.log('Bitácora enviado con éxito:', response);
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'La Bitácora se ha registrado correctamente.',
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

  actualizarCp() {
    const cp = this.reportForm.get('cp').value;
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });

    if (cp.length === 5) {
      this.http
        .get<any[]>(`https://sandbox.macgto.com/api/colonias/${cp}`, {
          headers,
        })
        .subscribe(
          (data) => {
            const coloniaSelect = this.reportForm.get('colonia');
            const municipioInput = this.reportForm.get('municipio');
            const municipioIdInput = this.reportForm.get('id_municipio');
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
      this.reportForm.get('colonia').setValue('');
      this.cpError = false;
      this.reportForm.get('municipio').setValue('');
      this.reportForm.get('id_municipio').setValue('');
    }
  }
}
