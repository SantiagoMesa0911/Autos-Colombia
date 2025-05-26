const Celda = require('../Models/CeldaMol');

class CeldaService {
  async crearCelda(data) {
    if (await Celda.findOne({ codigo: data.codigo })) {
      throw new Error('El código de celda ya existe');
    }
    const celda = new Celda(data);
    return await celda.save();
  }

  async obtenerCeldas(filtro = {}) {
    return await Celda.find(filtro).populate('vehiculo');
  }

  async obtenerCeldaPorId(id) {
    return await Celda.findById(id).populate('vehiculo');
  }

  async obtenerCeldasDisponibles(tipo = null) {
    const filtro = { estado: 'disponible' };
    if (tipo) filtro.tipo = tipo;
    return await Celda.find(filtro);
  }

  async asignarVehiculo(celdaId, vehiculoId) {
    const celda = await Celda.findById(celdaId);
    if (!celda) throw new Error('Celda no encontrada');
    if (celda.estado !== 'disponible') throw new Error('Celda no disponible');
    
    return await Celda.findByIdAndUpdate(
      celdaId,
      { vehiculo: vehiculoId, estado: 'ocupada' },
      { new: true }
    ).populate('vehiculo');
  }

  async liberarCelda(celdaId) {
    return await Celda.findByIdAndUpdate(
      celdaId,
      { $unset: { vehiculo: 1 }, estado: 'disponible' },
      { new: true }
    );
  }

  async actualizarCelda(id, data) {
    if (data.codigo && await Celda.findOne({ codigo: data.codigo, _id: { $ne: id } })) {
      throw new Error('El código de celda ya existe');
    }
    return await Celda.findByIdAndUpdate(id, data, { new: true });
  }

  async cambiarEstadoCelda(id, estado) {
    if (!['disponible', 'ocupada', 'reservada', 'mantenimiento'].includes(estado)) {
      throw new Error('Estado no válido');
    }
    return await Celda.findByIdAndUpdate(id, { estado }, { new: true });
  }

  async eliminarCelda(id) {
    const celda = await Celda.findById(id);
    if (celda.estado === 'ocupada') {
      throw new Error('No se puede eliminar una celda ocupada');
    }
    return await Celda.findByIdAndDelete(id);
  }
}

module.exports = CeldaService;