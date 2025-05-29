const express = require('express');
const CeldaService = require('../Services/celda');

function CeldaRoutes(app) {
  const router = express.Router();
  const celdaService = new CeldaService();

  app.use('/celdas', router);

  router.post('/', async (req, res) => {
    try {
      const celda = await celdaService.crearCelda(req.body);
      res.status(201).json(celda);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const celdas = await celdaService.obtenerCeldas();
      res.json(celdas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/agrupadas', async (req, res) => {
    try {
      const celdas = await celdaService.obtenerCeldasAgrupadas();
      res.json(celdas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/disponibles', async (req, res) => {
    try {
      const { tipo } = req.query;
      const celdas = await celdaService.obtenerCeldasDisponibles(tipo || null);
      res.json(celdas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const celda = await celdaService.obtenerCeldaPorId(req.params.id);
      res.json(celda);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const celda = await celdaService.actualizarCelda(req.params.id, req.body);
      res.json(celda);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.post('/:id/asignar', async (req, res) => {
    try {
      const { vehiculoId } = req.body;
      const celda = await celdaService.asignarVehiculo(req.params.id, vehiculoId);
      res.json(celda);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.post('/:id/liberar', async (req, res) => {
    try {
      const celda = await celdaService.liberarCelda(req.params.id);
      res.json(celda);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.patch('/:id/estado', async (req, res) => {
    try {
      const { estado } = req.body;
      const celda = await celdaService.cambiarEstadoCelda(req.params.id, estado);
      res.json(celda);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      await celdaService.eliminarCelda(req.params.id);
      res.json({ message: 'Celda eliminada correctamente.' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

   router.get('/estadisticas', async (req, res) => {
    try {
      const estadisticas = await celdaService.obtenerEstadisticas();
      res.json(estadisticas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/estadisticas/:id', async (req, res) => {
    try {
      const celda = await celdaService.obtenerCeldaPorId(req.params.id);
      res.json(celda);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
}

module.exports = CeldaRoutes;
