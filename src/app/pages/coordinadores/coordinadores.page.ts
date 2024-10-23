import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoordinadorServiceService } from 'src/app/services/coordinador-service.service';
import { AlertController, NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-coordinadores',
  templateUrl: './coordinadores.page.html',
  styleUrls: ['./coordinadores.page.scss'],
})
export class CoordinadoresPage implements OnInit {
  coordinadorForm: FormGroup;
  cpError: boolean = false;
  colonias: any[] = [];

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private coordinadorService: CoordinadorServiceService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private apiService: ApiServiceService
  ) {}

  ngOnInit() {
    this.coordinadorForm = this.formBuilder.group({
      curp: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      paterno: ['', [Validators.required]],
      materno: ['', [Validators.required]],
      estado_nacimiento: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      clave_elector: ['', [Validators.required]],
      vigencia_ine: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      cp: ['', [Validators.required]],
      colonia: ['', [Validators.required]],
      calle: ['', [Validators.required]],
      interno: ['', [Validators.required]],
      externo: ['', [Validators.required]],
      seccion: ['', [Validators.required]],
      municipio: ['', Validators.required],
      id_municipio: ['', Validators.required],
      id_coordinador_alta: ['', Validators.required],
    });

    this.coordinadorForm.get('cp').valueChanges.subscribe((cp) => {
      this.actualizarCp();
    });
  }

  async onSubmit() {
    const params = this.coordinadorForm.value;

    console.log(this.coordinadorForm.valid);

    if (this.coordinadorForm.valid) {
      this.coordinadorService.sendReport(params).subscribe(
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

  actualizarCp() {
    const cp = this.coordinadorForm.get('cp').value;
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
            const coloniaSelect = this.coordinadorForm.get('colonia');
            const municipioInput = this.coordinadorForm.get('municipio');
            const municipioIdInput = this.coordinadorForm.get('id_municipio');
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
      this.coordinadorForm.get('colonia').setValue('');
      this.cpError = false;
      this.coordinadorForm.get('municipio').setValue('');
      this.coordinadorForm.get('id_municipio').setValue('');
    }
  }

  onCurpChange() {
    const curpValue = this.coordinadorForm.get('curp')?.value;

    if (curpValue && curpValue.length === 18) {
      this.apiService.consultarCurp(curpValue).subscribe(
        (data) => {
          console.log(data); // Verifica la respuesta de la API
          this.coordinadorForm.patchValue({
            nombre: data.data.name,
            paterno: data.data.lastname,
            materno: data.data.surname,
            fecha_nacimiento : data.data.birthDate,
            genero: data.data.genre
            
          });
        },
        (error) => {
          console.error('Error al consultar CURP:', error);
          alert('No se encontraron datos para el CURP proporcionado.');
        }
      );
    }
  }
}
