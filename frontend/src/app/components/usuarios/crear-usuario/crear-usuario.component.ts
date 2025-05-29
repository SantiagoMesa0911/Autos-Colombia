import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true,

})
export class CrearUsuarioComponent {
  usuario = {
    nombre: '',
    identificacion: '',
    email: '',
    password: '',
    telefono: '',
    tipo: 'cliente'
  };

  constructor(private http: HttpClient, private router: Router) { }

  crearUsuario() {
    this.http.post(`${environment.apiUrl}/usuarios`, this.usuario)
      .subscribe({
        next: (res) => {
          alert('Usuario creado con éxito');
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          console.error(err);
          alert('Error al crear el usuario');
        }
      });
  }
}
