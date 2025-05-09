export interface Vehiculo {
    _id?: string;
    placa: string;
    tipo: string;
    horaEntrada: Date;
    horaSalida?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}