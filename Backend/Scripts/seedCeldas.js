const mongoose = require('mongoose');
const Celda = require('../Models/CeldaMol');

const celdasIniciales = [
    // Piso 1
    { codigo: 'A1', piso: 1, tipo: 'carro', estado: 'disponible' },
    { codigo: 'B1', piso: 1, tipo: 'moto', estado: 'disponible' },
    { codigo: 'C1', piso: 1, tipo: 'discapacitado', estado: 'disponible' },
    { codigo: 'D1', piso: 2, tipo: 'carga', estado: 'disponible' },
    { codigo: 'D2', piso: 2, tipo: 'carga', estado: 'disponible' },
    // Piso 2
    { codigo: 'A2', piso: 1, tipo: 'carro', estado: 'disponible' },
    { codigo: 'B2', piso: 1, tipo: 'carro', estado: 'disponible' },
    { codigo: 'C2', piso: 1, tipo: 'moto', estado: 'disponible' },
    { codigo: 'D2', piso: 1, tipo: 'discapacitado', estado: 'disponible' },
    { codigo: 'E2', piso: 1, tipo: 'discapacitado', estado: 'disponible' },

];

async function seedDatabase() {
    try {
        // Verificar si ya existen celdas
        const count = await Celda.countDocuments();

        if (count > 0) {
            return {
                success: false,
                message: 'Ya existen celdas en la base de datos',
                count
            };
        }

        // Insertar nuevas celdas
        const result = await Celda.insertMany(celdasIniciales);

        return {
            success: true,
            message: `Celdas inicializadas correctamente. Se crearon ${result.length} celdas`,
            count: result.length
        };
    } catch (error) {
        console.error('❌ Error en seedDatabase:', error);
        throw error; // Re-lanzamos el error para manejarlo en el llamador
    }
}

// Exportamos la función para poder usarla desde otros archivos
module.exports = seedDatabase;