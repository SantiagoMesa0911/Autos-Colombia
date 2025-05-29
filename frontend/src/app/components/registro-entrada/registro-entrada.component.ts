import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { VehiculoService } from '../../services/vehiculo.service';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registro-entrada',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './registro-entrada.component.html',
  styleUrls: ['./registro-entrada.component.css']
})
export class RegistroEntradaComponent implements OnInit {

  vehiculo = {
    placa: '',
    tipo: 'carro' as 'carro' | 'moto' | 'discapacitado' | 'carga'
  };
  mensaje: string | null = null;
  error: string | null = null;
  usuario: any = null;

  constructor(
    private vehiculoService: VehiculoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usuario = this.authService.getCurrentUser();
  }

  registrarEntrada() {
    this.mensaje = null;
    this.error = null;

    // Validación básica en frontend
    if (!this.vehiculo.placa || !this.vehiculo.tipo) {
      this.error = 'Placa y tipo son requeridos';
      return;
    }

    this.vehiculoService.registrarEntrada(this.vehiculo).subscribe({
      next: (response: any) => {
        this.mensaje = response.message || 'Vehículo registrado exitosamente';
        if (response.celda) {
          this.mensaje += ` en celda ${response.celda.codigo} (Piso ${response.celda.piso})`;
        }
        this.vehiculo.placa = '';
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error registrando entrada:', err);
        this.error = err.error?.message ||
          err.message ||
          'Error desconocido al registrar entrada';
      }
    });
  }
}