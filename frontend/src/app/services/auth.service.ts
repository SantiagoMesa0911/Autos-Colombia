import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthResponse, LoginData } from '../models/usuario.model';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        this.userSubject.next(JSON.parse(user));
      }
    }
  }


  logout() {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }


  login(data: LoginData) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data).pipe(
      tap(res => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.usuario));
        }
        this.userSubject.next(res.usuario);
      })
    );
  }
  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  guardarUsuario(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      return true;
    }
    return false;
  }


  getCurrentUser() {
    return this.userSubject.value;
  }
}
