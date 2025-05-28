import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  loading = true;
  error: string | null = null;
  cambiandoEstadoId: string | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.loading = true;
    this.error = null;
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.msg || 'Error al cargar usuarios';
        this.loading = false;
      }
    });
  }

  

  editarUsuario(id: string): void {
    this.router.navigate(['/usuarios', id, 'editar']);
  }

  cambiarEstado(id: string, estado: boolean): void {
    this.cambiandoEstadoId = id;
    this.usuarioService.cambiarEstadoUsuario(id, !estado).subscribe({
      next: () => {
        this.cambiandoEstadoId = null;
        this.cargarUsuarios();
      },
      error: (err) => {
        this.error = err.error?.msg || 'Error al cambiar estado';
        this.cambiandoEstadoId = null;
      }
    });
  }


  irACrearUsuario() {
    this.router.navigate(['/crear-usuario']);
  }
}
