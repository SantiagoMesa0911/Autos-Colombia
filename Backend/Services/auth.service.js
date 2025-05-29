const Usuario = require('../Models/UsuarioMol');
const { generarJWT } = require('../helpers/jwt');

class AuthService {
    async autenticarUsuario(email, password) {
        const usuario = await Usuario.findOne({ email }).select('+password');
        if (!usuario || !(await usuario.compararPassword(password))) {
            throw new Error('Credenciales incorrectas');
        }
        if (!usuario.estado) {
            throw new Error('Usuario inactivo');
        }
        const token = await generarJWT(usuario.id);
        
        const usuarioObj = usuario.toObject();
        delete usuarioObj.password;
        
        return { 
            usuario: usuarioObj, 
            token 
        };
    }

    async renovarToken(usuarioId) {
        try {
            const token = await generarJWT(usuarioId);
            const usuario = await Usuario.findById(usuarioId);
            
            if (!usuario || !usuario.estado) {
                throw new Error('Usuario no válido');
            }
            
            return { 
                usuario: usuario.toObject(), 
                token 
            };
        } catch (error) {
            throw new Error('Error al renovar el token');
        }
    }
}

module.exports = AuthService;