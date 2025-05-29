const express = require('express');
const UsuarioService = require('../Services/usuario');
const { validarJWT } = require('../Middleware/ValidarJWT');

function UsuarioRoutes(app) {
    const router = express.Router();
    const usuarioService = new UsuarioService();

    app.use('/usuarios', router);

    router.post('/', async (req, res) => {
        try {
            const usuario = await usuarioService.crearUsuario(req.body);
            res.status(201).json(usuario);
        } catch (error) {
            res.status(400).json({
                message: error.message || 'Error al crear usuario'
            });
        }
    });

    router.get('/', [validarJWT], async (req, res) => {
        try {
            const usuarios = await usuarioService.obtenerUsuarios();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Error al obtener usuarios'
            });
        }
    });

    // Obtener usuario por ID
    router.get('/:id', [validarJWT], async (req, res) => {
        try {
            const usuario = await usuarioService.obtenerUsuarioPorId(req.params.id);
            res.json(usuario);
        } catch (error) {
            res.status(404).json({
                message: error.message || 'Usuario no encontrado'
            });
        }
    });

    // Actualizar usuario
    router.put('/:id', [validarJWT], async (req, res) => {
        try {
            const usuario = await usuarioService.actualizarUsuario(
                req.params.id,
                req.body
            );
            res.json(usuario);
        } catch (error) {
            res.status(400).json({
                message: error.message || 'Error al actualizar usuario'
            });
        }
    });

    // Cambiar estado de usuario
    router.put('/:id/estado', [validarJWT], async (req, res) => {
        try {
            const { estado } = req.body;

            const usuario = await usuarioService.cambiarEstadoUsuario(
                req.params.id,
                estado
            );

            res.json(usuario);
        } catch (error) {
            res.status(400).json({
                message: error.message || 'Error al cambiar estado'
            });
        }
    });


    // Eliminar usuario
    router.delete('/:id', [validarJWT], async (req, res) => {
        try {
            await usuarioService.eliminarUsuario(req.params.id);
            res.json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            res.status(400).json({
                message: error.message || 'Error al eliminar usuario'
            });
        }
    });
}

module.exports = UsuarioRoutes;