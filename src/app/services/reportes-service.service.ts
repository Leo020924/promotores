// src/app/services/reportes.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private endpoint = `https://sandbox.macgto.com/api/alta_incidencia`; // Cambia esta URL según tu API de Laravel
  private token = this.authService.getToken();
  private headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.token
  };
  constructor(private http: HttpClient, private authService: AuthService) {}

  sendReport(formData: FormData): Observable<any> {

    
  const headers = this.headers;
  console.log(headers);
    return this.http.post(this.endpoint, formData ,{ headers});
  }
}
