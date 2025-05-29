import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) { }

  obtenerUsuarios() {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  obtenerUsuarioPorId(id: string) {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  crearUsuario(usuario: Omit<Usuario, '_id'>) {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  actualizarUsuario(id: string, usuario: Partial<Usuario>) {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }


  cambiarEstadoUsuario(id: string, estado: boolean) {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}/estado`, { estado });
  }

  getUsuarioPorId(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }


}