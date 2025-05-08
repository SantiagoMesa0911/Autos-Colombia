const express = require('express');
const VehiculoService = require('../Services/vehiculo');

function VehiculoRoutes(app) {
  const router = express.Router();
  const vehiculoService = new VehiculoService();

  app.use('/vehiculos', router);

  // Registrar entrada
  router.post('/entrada', async (req, res) => {
    try {
      const entrada = await vehiculoService.registrarEntrada(req.body);
      res.json(entrada);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Registrar salida
  router.post('/salida/:placa', async (req, res) => {
    try {
      const salida = await vehiculoService.registrarSalida(req.params.placa);
      res.json(salida);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Consultar historial por placa
  router.get('/historial/:placa', async (req, res) => {
    try {
      const historial = await vehiculoService.obtenerHistorial(req.params.placa);
      res.json(historial);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  // Consultar vehículos actualmente parqueados
  router.get('/activos', async (_req, res) => {
    try {
      const vehiculos = await vehiculoService.obtenerVehiculosActivos();
      res.json(vehiculos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}

module.exports = VehiculoRoutes;
