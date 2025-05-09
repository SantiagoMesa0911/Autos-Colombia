import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

interface Vehiculo {
  placa: string;
  tipo: string;
  horaEntrada: Date;
  horaSalida?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private apiUrl = `${environment.apiUrl}/vehiculos`;

  constructor(private http: HttpClient) {}

  registrarEntrada(vehiculo: Omit<Vehiculo, 'horaEntrada' | 'horaSalida'>): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(`${this.apiUrl}/entrada`, vehiculo);
  }

  registrarSalida(placa: string): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${this.apiUrl}/salida/${placa}`, {});
  }

  obtenerHistorial(placa: string): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.apiUrl}/historial/${placa}`);
  }

  obtenerActivos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.apiUrl}/activos`);
  }
}