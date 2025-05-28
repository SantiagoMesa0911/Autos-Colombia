// src/app/components/auth/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = null;

    const loginData = this.loginForm.value;

    this.authService.login(loginData).subscribe({
      next: (resp) => {
        const rol = resp.usuario?.tipo
        this.authService.guardarToken(resp.token);
        this.authService.guardarUsuario(resp.usuario);
        switch (rol) {
          case 'admin':
            this.router.navigate(['/entrada']);
            break;
          case 'cliente':
            this.router.navigate(['/historial']);
            break;
          case 'empleado':
            this.router.navigate(['/entrada']);
            break;
          default:
            this.router.navigate(['/']);
            break;
        }

      },
      error: (err) => {
        this.error = err.error?.msg || 'Error al iniciar sesión';
        this.loading = false;
      }
    });
  }
}
