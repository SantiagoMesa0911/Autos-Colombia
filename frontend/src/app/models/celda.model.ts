// models/celda.model.ts
export type TipoCelda = 'carro' | 'moto' | 'discapacitado' | 'carga';
export type EstadoCelda = 'disponible' | 'ocupada' | 'reservada' | 'mantenimiento';

export interface Celda {
  _id?: string;
  codigo: string;
  tipo: TipoCelda;
  piso: number;
  estado: EstadoCelda;
  vehiculo?: any; 
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CeldaGrupo {
  _id: number;
  celdas: Celda[];
}

export interface CeldaEstado {
  _id: number;  
  disponible: number;
  ocupada: number;
  reservada: number;
  mantenimiento: number;
  total: number;
}

export interface FiltroCeldas {
  tipo?: TipoCelda;
  estado?: EstadoCelda;
  piso?: number;
}