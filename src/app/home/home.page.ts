import { Component } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  tipos: any[] = [];
  public language:string;
  public languages:string[];

  constructor(private sqlite :SqliteService, private authService: AuthService, private http: HttpClient) {


    this.language='';
    this.languages=[];

  }

  ngOnInit() {
  
    this.cargarBitacoras();
  }

  create(){

  }
  read(){
    
  }

  update(language : string){


  }
  delete(language : string){

  }

  cargarBitacoras() {

    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    this.http.get<any[]>('https://sandbox.macgto.com/api/bitacoras',{headers}).subscribe(data => {
      this.tipos = data; // Suponiendo que la respuesta es un array de tipos
  
    });
  }



}
