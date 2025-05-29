const express = require('express');
const AuthService = require('../Services/auth.service');
const { validarJWT } = require('../Middleware/ValidarJWT');

function AuthRoutes(app) {
    const router = express.Router();
    const authService = new AuthService();

    app.use('/auth', router);

    router.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            const result = await authService.autenticarUsuario(email, password);
            res.json(result);
        } catch (error) {
            res.status(400).json({ 
                message: error.message || 'Error en la autenticación'
            });
        }
    });

    router.post('/renovar', [validarJWT], async (req, res) => {
        try {
            const result = await authService.renovarToken(req.usuarioId);
            res.json(result);
        } catch (error) {
            res.status(401).json({ 
                message: error.message || 'Error al renovar el token'
            });
        }
    });

    router.get('/validar', [validarJWT], async (req, res) => {
        res.json({ 
            valid: true, 
            usuarioId: req.usuarioId 
        });
    });
}

module.exports = AuthRoutes;