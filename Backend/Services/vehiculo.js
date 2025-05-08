const VehiculoModel = require('../models/Vehiculo');

class VehiculoService {
  async registrarEntrada(data) {
    const { placa, tipo } = data;

    if (!placa || !tipo) {
      throw new Error('Placa y tipo de vehículo son requeridos.');
    }

    // Verificar si ya está dentro
    const activo = await VehiculoModel.findOne({ placa, horaSalida: null });
    if (activo) {
      throw new Error('El vehículo ya se encuentra registrado como activo.');
    }

    const nuevoRegistro = new VehiculoModel({
      placa,
      tipo,
      horaEntrada: new Date(),
    });

    return await nuevoRegistro.save();
  }

  async registrarSalida(placa) {
    const vehiculo = await VehiculoModel.findOne({ placa, horaSalida: null });

    if (!vehiculo) {
      throw new Error('Vehículo no encontrado o ya salió.');
    }

    vehiculo.horaSalida = new Date();
    await vehiculo.save();

    return {
      message: 'Salida registrada correctamente.',
      vehiculo,
    };
  }

  async obtenerHistorial(placa) {
    const historial = await VehiculoModel.find({ placa });
    if (historial.length === 0) {
      throw new Error('No se encontraron registros para esta placa.');
    }

    return historial;
  }

  async obtenerVehiculosActivos() {
    return await VehiculoModel.find({ horaSalida: null });
  }
}

module.exports = VehiculoService;
