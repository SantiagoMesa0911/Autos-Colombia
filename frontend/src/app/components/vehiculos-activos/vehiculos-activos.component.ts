import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { VehiculoService } from '../../services/vehiculo.service';
import { Vehiculo } from '../../models/vehiculo.model';

@Component({
  selector: 'app-vehiculos-activos',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, DatePipe],
  templateUrl: './vehiculos-activos.component.html',
  styleUrls: ['./vehiculos-activos.component.css']
})
export class VehiculosActivosComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private vehiculoService: VehiculoService) {}

  ngOnInit(): void {
    this.cargarVehiculosActivos();
  }

  cargarVehiculosActivos() {
    this.loading = true;
    this.error = null;
    
    this.vehiculoService.obtenerActivos().subscribe({
      next: (vehiculos) => {
        this.vehiculos = vehiculos;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al cargar vehículos activos';
        this.loading = false;
      }
    });
  }

  calcularTiempo(horaEntrada: Date): string {
    const ahora = new Date();
    const entrada = new Date(horaEntrada);
    const diff = Math.abs(ahora.getTime() - entrada.getTime());
    
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${horas}h ${minutos}m`;
  }
}