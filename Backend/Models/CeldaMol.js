const mongoose = require ('mongoose')

const CeldaSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: [true, 'El código es obligatorio'],
    unique: true,
    trim: true,
    uppercase: true
  },
  tipo: {
    type: String,
    enum: ['carro', 'moto', 'discapacitado', 'carga'],
    required: [true, 'El tipo de celda es obligatorio']
  },
  piso: {
    type: Number,
    required: [true, 'El piso es obligatorio'],
    min: 1,
    max: 10
  },
  estado: {
    type: String,
    enum: ['disponible', 'ocupada', 'reservada', 'mantenimiento'],
    default: 'disponible'
  },
  vehiculo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehiculo',
    default: null
  },
  ultimaActualizacion: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps:true
});

const Celda = mongoose.model('celda', CeldaSchema)

module.exports = Celda