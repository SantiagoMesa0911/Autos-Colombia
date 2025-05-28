import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-usuario.component.html'
})
export class EditarUsuarioComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  usuarioId: string = '';
  usuario: any = {
    nombre: '',
    identificacion: '',
    email: '',
    telefono: '',
  };

  ngOnInit() {
    this.usuarioId = this.route.snapshot.paramMap.get('id') || '';
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.usuarioService.getUsuarioPorId(this.usuarioId).subscribe({
      next: (res) => this.usuario = res,
      error: (err) => alert('Error al cargar el usuario')
    });
  }

  actualizarUsuario() {
    this.usuarioService.actualizarUsuario(this.usuarioId, this.usuario).subscribe({
      next: () => {
        alert('Usuario actualizado con éxito');
        this.router.navigate(['/usuarios']);
      },
      error: () => alert('Error al actualizar el usuario')
    });
  }
}
