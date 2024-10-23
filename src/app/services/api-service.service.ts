import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = 'https://sandbox.macgto.com/api/validar_curp'; // URL de la API
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) { 
    const token = this.authService.getToken();
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
  }

  consultarCurp(curp): Observable<any> {
    // const params = new HttpParams().set('curp', curp); // Agregar el CURP como parámetro

    return this.http.post<any>(this.apiUrl, { headers: this.headers, curp });
  }
}

