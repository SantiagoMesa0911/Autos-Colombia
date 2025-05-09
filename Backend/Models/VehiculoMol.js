const mongoose = require('mongoose')

const VehiculoSchema = new mongoose.Schema({
    placa: {
        type: String,
        required: true,
        unique: true
    },
    tipo: {
        type: String,
        required: true
    },
    horaEntrada: { type: Date, required: true },
    horaSalida: { type: Date, default: null },
}, {
    timestamps: true,
});


const Vehiculo = mongoose.model('Vehiculo', VehiculoSchema)

module.exports = Vehiculo