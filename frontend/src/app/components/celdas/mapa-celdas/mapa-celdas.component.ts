// mapa-celdas.component.ts
import { Component, OnInit } from '@angular/core';
import { CeldaService } from '../../../services/celda.service';
import { Celda, CeldaGrupo, CeldaEstado } from '../../../models/celda.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mapa-celdas',
  templateUrl: './mapa-celdas.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./mapa-celdas.component.scss']
})
export class MapaCeldasComponent implements OnInit {
  grupos: CeldaGrupo[] = [];
  estadisticas: CeldaEstado[] = [];
  loading = true;
  error: string | null = null;

  constructor(private celdaService: CeldaService) { }

  ngOnInit(): void {
    this.cargarCeldas();
  }

  cargarCeldas(): void {
    this.loading = true;
    this.error = null;

    this.celdaService.obtenerCeldasAgrupadas().subscribe({
      next: (grupos: CeldaGrupo[]) => {
        this.grupos = grupos;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err.error?.msg || 'Error al cargar celdas';
        this.loading = false;
      }
    });
  }



  getEstadoResumen(): any {
    if (!this.estadisticas || this.estadisticas.length === 0) return null;

    return this.estadisticas.reduce((acc: any, piso: CeldaEstado) => {
      acc.disponible += piso.disponible;
      acc.ocupada += piso.ocupada;
      acc.reservada += piso.reservada;
      acc.mantenimiento += piso.mantenimiento;
      acc.total += piso.total;
      return acc;
    }, {
      disponible: 0,
      ocupada: 0,
      reservada: 0,
      mantenimiento: 0,
      total: 0
    });
  }

  getCeldaClass(estado: string): string {
    const classes: Record<string, string> = {
      'disponible': 'bg-success text-white',
      'ocupada': 'bg-danger text-white',
      'reservada': 'bg-warning text-dark',
      'mantenimiento': 'bg-secondary text-white'
    };
    return classes[estado] || 'bg-light text-dark';
  }

  getCeldaIcon(tipo: string): string {
    const icons: Record<string, string> = {
      'carro': '🚗',
      'moto': '🏍️',
      'discapacitado': '♿',
      'carga': '🚚'
    };
    return icons[tipo] || '🅿️';
  }

  onCeldaClick(celda: Celda): void {
    console.log('Celda seleccionada:', celda);
  }
}