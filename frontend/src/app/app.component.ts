import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../app/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Sistema de Parqueo';
  usuario: any = null;
  constructor(public router: Router, public authService: AuthService) { }

  logout() {
    this.usuario = this.authService.getCurrentUser();
    this.authService.logout();
  }
  isAdmin(): boolean {
    const user = this.authService.getCurrentUser();
    return user?.tipo === 'admin';
  }

  isAdminOrEmpleado(): boolean {
    const user = this.authService.getCurrentUser();
    return user?.tipo === 'admin' || user?.tipo === 'empleado';
  }
}