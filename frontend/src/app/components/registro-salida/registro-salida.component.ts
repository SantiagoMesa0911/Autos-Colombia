// src/app/components/registro-salida/registro-salida.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { VehiculoService } from '../../services/vehiculo.service';

@Component({
  selector: 'app-registro-salida',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './registro-salida.component.html',
  styleUrls: ['./registro-salida.component.css']
})
export class RegistroSalidaComponent {
  placa: string = '';
  mensaje: string | null = null;
  error: string | null = null;

  constructor(private vehiculoService: VehiculoService) {}

  registrarSalida() {
    this.mensaje = null;
    this.error = null;

    this.vehiculoService.registrarSalida(this.placa).subscribe({
      next: (response) => {
        this.mensaje = response.message;
        this.placa = '';
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al registrar salida';
      }
    });
  }
}