// src/app/components/registro-entrada/registro-entrada.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehiculoService } from '../../services/vehiculo.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-registro-entrada',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './registro-entrada.component.html',
  styleUrls: ['./registro-entrada.component.css']
})
export class RegistroEntradaComponent {
  vehiculo = { placa: '', tipo: 'carro' };
  mensaje: string | null = null;
  error: string | null = null;

  constructor(private vehiculoService: VehiculoService) {}

  registrarEntrada() {
    this.mensaje = null;
    this.error = null;

    this.vehiculoService.registrarEntrada(this.vehiculo).subscribe({
      next: () => {
        this.mensaje = 'Entrada registrada correctamente';
        this.vehiculo.placa = '';
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al registrar entrada';
      }
    });
  }
}