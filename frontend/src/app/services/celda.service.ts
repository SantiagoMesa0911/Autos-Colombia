import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Celda, CeldaGrupo, CeldaEstado, FiltroCeldas, TipoCelda } from '../models/celda.model';

@Injectable({
  providedIn: 'root'
})
export class CeldaService {
  private apiUrl = `${environment.apiUrl}/celdas`;

  constructor(private http: HttpClient) { }

  obtenerCeldas(filtros?: FiltroCeldas): Observable<Celda[]> {
    return this.http.get<Celda[]>(this.apiUrl, { params: filtros as any });
  }

  obtenerCeldasAgrupadas(): Observable<CeldaGrupo[]> {
    return this.http.get<CeldaGrupo[]>(`${this.apiUrl}/agrupadas`);
  }

  obtenerEstadisticas(): Observable<CeldaEstado[]> {
    return this.http.get<CeldaEstado[]>(`${this.apiUrl}/estadisticas`);
  }


  obtenerCeldaPorId(id: string) {
    return this.http.get<Celda>(`${this.apiUrl}/${id}`);
  }


  obtenerCeldasDisponibles(tipo?: TipoCelda) {
    const params: any = {};
    if (tipo) params.tipo = tipo;

    return this.http.get<Celda[]>(`${this.apiUrl}/disponibles`, { params });
  }

  crearCelda(celda: Omit<Celda, '_id'>) {
    return this.http.post<Celda>(this.apiUrl, celda);
  }

  asignarVehiculo(celdaId: string, vehiculoId: string) {
    return this.http.post<Celda>(`${this.apiUrl}/${celdaId}/asignar`, { vehiculoId });
  }

  liberarCelda(celdaId: string) {
    return this.http.post<Celda>(`${this.apiUrl}/${celdaId}/liberar`, {});
  }

  actualizarCelda(id: string, celda: Partial<Celda>) {
    return this.http.put<Celda>(`${this.apiUrl}/${id}`, celda);
  }



 
}