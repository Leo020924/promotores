import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { API_URL } from 'src/app/constants/constants';
import { AuthService } from 'src/app/services/auth.service';
import { ReportesService } from 'src/app/services/reportes-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reportes-incidencias',
  templateUrl: './reportes-incidencias.page.html',
  styleUrls: ['./reportes-incidencias.page.scss'],
})
export class ReportesIncidenciasPage implements OnInit {
  reportForm: FormGroup;
  cpError: boolean = false;
  multimediaFile: File | null = null;
  audioFile: File | null = null;
  location: String = '';
  selectedFiles: File[] = [];
  tipos: any[] = [];
  dependencias: any[] = [];
  colonias: any[] = [];
  evidencias: File[] = [];
  maxFiles = 5; // Máximo número de archivos permitidos

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private reportesService: ReportesService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.reportForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      tipo: ['', Validators.required],
      dependencia: ['', Validators.required],
      descripcion: ['', Validators.required],
      cp: ['', Validators.required],
      municipio: ['', Validators.required],
      id_municipio: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required],
      exterior: ['', Validators.required],
      interior: ['', Validators.required],
      seccion: ['', Validators.required],
      evidencia: ['',Validators.required],
      comentario: ['', Validators.required],
    });

    this.cargarTipos();

    this.reportForm.get('cp').valueChanges.subscribe((cp) => {
      this.actualizarCp();
    });
  }

  

  async onSubmit() {
    const formData = new FormData();
  
    // Agregar otros campos del formulario
    formData.append('titulo', this.reportForm.value.titulo);
    formData.append('tipo', this.reportForm.value.tipo);
    formData.append('dependencia', this.reportForm.value.dependencia);
    formData.append('descripcion', this.reportForm.value.descripcion);
    formData.append('cp', this.reportForm.value.cp);
    formData.append('municipio', this.reportForm.value.municipio);
    formData.append('id_municipio', this.reportForm.value.id_municipio);
    formData.append('colonia', this.reportForm.value.colonia);
    formData.append('calle', this.reportForm.value.calle);
    formData.append('exterior', this.reportForm.value.exterior);
    formData.append('interior', this.reportForm.value.interior);
    formData.append('seccion', this.reportForm.value.seccion);
    formData.append('comentario', this.reportForm.value.comentario);
  
    // Agregar las imágenes al FormData
    this.evidencias.forEach((file, index) => {
      formData.append(`evidencias[]`, file); // Cambiado a `evidencias[]`
    });
  
    console.log(this.reportForm.value);
    console.log(this.evidencias); // Para verificar que se están agregando las imágenes
  
    if (this.reportForm.valid) {
      this.reportesService.sendReport(formData).subscribe(
        (response) => {
          console.log('Reporte enviado con éxito:', response);
          this.alertaRegistroExitoso();
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

 onFileChange(event: any) {
  const files: FileList = event.target.files;
  this.evidencias = Array.from(files); // Convierte el FileList en un array
  //console.log(this.evidencias); // Para verificar que se están capturando las imágenes
}

  /* onAudioChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.audioFile = file;
    }
  } */

  /*   getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.location = `Lat: ${lat}, Lng: ${lng}`;
          // Puedes hacer algo más con la ubicación aquí, como almacenarla en el formulario
        },
        (error) => {
          console.error('Error obteniendo la ubicación', error);
          // Manejo de errores
        }
      );
    } else {
      console.log('Geolocalización no es soportada por este navegador.');
    }
  }
 */

  async alertaRegistroExitoso() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'La incidencia se ha registrado correctamente.',
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
  }

  actualizarCp() {
    const cp = this.reportForm.get('cp').value;
    const token = this.authService.getToken();
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
  
    if (cp.length === 5) {
      this.http.get<any[]>(`https://sandbox.macgto.com/api/colonias/${cp}`, { headers })
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
  

  cargarTipos() {

    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    this.http.get<any[]>('https://sandbox.macgto.com/api/tipos',{headers}).subscribe(data => {
      this.tipos = data; // Suponiendo que la respuesta es un array de tipos
      this.dependencias = [...new Set(data.map(tipo => tipo.dependencia.nombre))]; // Extraer nombres únicos
      console.log(data);
      console.log(this.dependencias);
    });
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

    validateInputExteriorInterior(event: any) {
      const input = event.target.value;
  
      // Filtrar caracteres no deseados (solo permite letras y números)
      const filteredInput = input.replace(/[^a-zA-Z0-9]/g, '');
  
      // Limitar a 7 caracteres en total
      if (filteredInput.length > 7) {
        event.target.value = filteredInput.slice(0, 7);
      } else {
        event.target.value = filteredInput;
      }
    }
  
  
}
