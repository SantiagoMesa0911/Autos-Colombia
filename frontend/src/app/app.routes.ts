import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'usuarios',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./components/usuarios/lista-usuarios/lista-usuarios.component').then(m => m.ListaUsuariosComponent)
          },
        ]
      },
      {
        path: 'crear-usuario',
        loadComponent: () => import('./components/usuarios/crear-usuario/crear-usuario.component').then(m => m.CrearUsuarioComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'editar-usuario/:id',
        loadComponent: () => import('./components/usuarios/editar-usuario/editar-usuario.component').then(m => m.EditarUsuarioComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'entrada',
        loadComponent: () =>
          import('./components/registro-entrada/registro-entrada.component').then(m => m.RegistroEntradaComponent)
      },
      {
        path: 'salida',
        loadComponent: () =>
          import('./components/registro-salida/registro-salida.component').then(m => m.RegistroSalidaComponent)
      },
      {
        path: 'activos',
        loadComponent: () =>
          import('./components/vehiculos-activos/vehiculos-activos.component').then(m => m.VehiculosActivosComponent)
      },
      {
        path: 'historial',
        loadComponent: () =>
          import('./components/consulta-historial/consulta-historial.component').then(m => m.ConsultaHistorialComponent)
      },
      {
        path: 'celdas',
        loadComponent: () =>
          import('./components/celdas/mapa-celdas/mapa-celdas.component').then(m => m.MapaCeldasComponent)
      },

      { path: '', redirectTo: 'entrada', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: '' }
];
