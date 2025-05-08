const mongoose = require('mongoose')

const VehiculoSchema = new  mongoose.Schema({
    placa:{
        type: String,
        required: true,
        unique:true
    },
    tipo:{
        type:String,
        required:true
    }
})


const Vehiculo = mongoose.model('Vehiculo', VehiculoSchema)

module.exports = Vehiculo