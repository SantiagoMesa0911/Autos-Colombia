const mongoose = require('mongoose')


const entradaSalidaSchema = new mongoose.Schema({
    vehiculo: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehiculo', required: true },
    horaEntrada: { type: Date, default: Date.now },
    horaSalida: { type: Date }
});


const EntradaSalida = mongoose.model('EntradaSalida', entradaSalidaSchema)

module.exports = EntradaSalida