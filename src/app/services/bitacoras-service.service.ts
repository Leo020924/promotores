import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BitacorasService {
  private endpoint = `https://sandbox.macgto.com/api/alta_bitacora`; // Cambia esta URL según tu API de Laravel
  private token = this.authService.getToken();
  private headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + this.token,
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  sendReport(params): Observable<any> {
    console.log(params);
    const headers = this.headers;

    console.log(headers);
    return this.http.post(this.endpoint, params, { headers });
  }
}
