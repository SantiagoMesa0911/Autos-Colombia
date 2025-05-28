export interface Usuario {
  _id?: string;
  nombre: string;
  identificacion: string;
  email: string;
  telefono: string;
  tipo: 'admin' | 'empleado' | 'cliente';
  estado: boolean;
  fechaRegistro?: Date;
}

export interface AuthResponse {
  usuario: Usuario;
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegistroData {
  nombre: string;
  identificacion: string;
  email: string;
  telefono: string;
  password: string;
  tipo: 'admin' | 'empleado' | 'cliente';
}