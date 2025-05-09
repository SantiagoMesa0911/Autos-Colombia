import { Component } from '@angular/core';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehiculoService } from '../../services/vehiculo.service';
import { Vehiculo } from '../../models/vehiculo.model';

@Component({
  selector: 'app-consulta-historial',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf, DatePipe],
  templateUrl: './consulta-historial.component.html',
  styleUrls: ['./consulta-historial.component.css']
})
export class ConsultaHistorialComponent {
  placa: string = '';
  historial: Vehiculo[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private vehiculoService: VehiculoService) {}

  consultarHistorial() {
    if (!this.placa.trim()) return;
    
    this.loading = true;
    this.error = null;
    this.historial = [];
    
    this.vehiculoService.obtenerHistorial(this.placa).subscribe({
      next: (historial) => {
        this.historial = historial;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al consultar historial';
        this.loading = false;
      }
    });
  }

  calcularTiempoEstacionado(entrada: Date, salida?: Date): string {
    const horaEntrada = new Date(entrada);
    const horaSalida = salida ? new Date(salida) : new Date();
    
    const diff = Math.abs(horaSalida.getTime() - horaEntrada.getTime());
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${horas}h ${minutos}m`;
  }
}