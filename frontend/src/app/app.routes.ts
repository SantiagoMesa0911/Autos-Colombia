// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'entrada',
    loadComponent: () => import('./components/registro-entrada/registro-entrada.component')
      .then(m => m.RegistroEntradaComponent) 
  },
  { 
    path: 'salida',
    loadComponent: () => import('./components/registro-salida/registro-salida.component')
      .then(m => m.RegistroSalidaComponent) 
  },
  { 
    path: 'activos',
    loadComponent: () => import('./components/vehiculos-activos/vehiculos-activos.component')
      .then(m => m.VehiculosActivosComponent) 
  },
  { 
    path: 'historial',
    loadComponent: () => import('./components/consulta-historial/consulta-historial.component')
      .then(m => m.ConsultaHistorialComponent) 
  },
  { path: '', redirectTo: 'entrada', pathMatch: 'full' },
  { path: '**', redirectTo: 'entrada' }
];