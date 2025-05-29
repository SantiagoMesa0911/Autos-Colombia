const mongoose = require('mongoose')

const VehiculoSchema = new mongoose.Schema({
    placa: {
        type: String,
        required: [true, 'La placa es obligatoria'],
        unique: true,
        uppercase: true,
        trim: true,
        match: [/^[A-Z0-9]{6}$/, 'La placa debe tener 6 caracteres alfanuméricos']
    },
    tipo: {
        type: String,
        enum: ['carro', 'moto', 'discapacitado', 'carga'],
        required: [true, 'El tipo de vehículo es obligatorio']
    },
    horaEntrada: {
        type: Date,
        required: true,
        default: Date.now
    },
    horaSalida: {
        type: Date
    }
}, { timestamps: true });


const Vehiculo = mongoose.model('Vehiculo', VehiculoSchema)

module.exports = Vehiculo