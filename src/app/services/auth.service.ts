import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = new BehaviorSubject<boolean>(false);
  authState = this.isAuthenticated.asObservable();

  constructor(private http: HttpClient, private navCtrl: NavController) { }

  // Metodo para inicias sesion
  login(email: string, password: string) {
    const url = 'https://sandbox.macgto.com/api/auth/login';
    const body = { email, password };

    return this.http.post(url, body, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap((response: any) => {
        if (response['message'] === 'Login successful') {
          localStorage.setItem('token', response['access_token']);
          this.isAuthenticated.next(true);
          this.navCtrl.navigateRoot('/home');
        } else {
          this.isAuthenticated.next(false);
        }
      })
    );
  }

  // Metodo para cerrar sesion
  logout(){
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
    this.navCtrl.navigateRoot('/login');
  }

  // Verificar si el usuario esta autentificado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
