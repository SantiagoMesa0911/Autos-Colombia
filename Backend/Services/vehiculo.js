const VehiculoModel = require('../Models/VehiculoMol');
const Celda = require('../Models/CeldaMol');

class VehiculoService {
  async registrarEntrada(data) {
    const { placa, tipo } = data;

    // Validación básica
    if (!placa || !tipo) {
      throw new Error('Placa y tipo de vehículo son requeridos');
    }

    // Verificar si el vehículo ya está registrado y activo
    const vehiculoActivo = await VehiculoModel.findOne({
      placa,
      horaSalida: null
    });

    if (vehiculoActivo) {
      throw new Error('El vehículo ya se encuentra registrado');
    }

    // Buscar celda disponible según el tipo
    const tipoCelda = this.mapearTipoVehiculoACelda(tipo);
    const celdaDisponible = await Celda.findOne({
      tipo: tipoCelda,
      estado: 'disponible'
    });

    if (!celdaDisponible) {
      throw new Error(`No hay celdas disponibles para ${tipo}`);
    }

    // Registrar el vehículo
    const nuevoVehiculo = new VehiculoModel({
      placa,
      tipo,
      horaEntrada: new Date()
    });

    const vehiculoGuardado = await nuevoVehiculo.save();

    // Asignar celda
    celdaDisponible.estado = 'ocupada';
    celdaDisponible.vehiculo = vehiculoGuardado._id;
    await celdaDisponible.save();

    return {
      message: 'Entrada registrada correctamente',
      vehiculo: vehiculoGuardado,
      celda: {
        codigo: celdaDisponible.codigo,
        piso: celdaDisponible.piso
      }
    };
  }

  async registrarSalida(placa) {
    const vehiculo = await VehiculoModel.findOne({ placa, horaSalida: null });

    if (!vehiculo) {
      throw new Error('Vehículo no encontrado o ya salió.');
    }

    vehiculo.horaSalida = new Date();
    await vehiculo.save();

    // Buscar la celda que tiene este vehículo asignado
    const celda = await Celda.findOne({ vehiculo: vehiculo._id });
    if (celda) {
      celda.vehiculo = null;
      celda.estado = 'disponible';
      await celda.save();
    }

    return {
      message: 'Salida registrada y celda liberada correctamente.',
      vehiculo,
      celdaLiberada: celda || null
    };
  }

  mapearTipoVehiculoACelda(tipoVehiculo) {
    const mapeo = {
      carro: 'carro',
      moto: 'moto',
      discapacitado: 'discapacitado',
      carga: 'carga'
    };
    return mapeo[tipoVehiculo] || 'carro';
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
