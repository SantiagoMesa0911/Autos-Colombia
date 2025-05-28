const Usuario = require('../Models/UsuarioMol');
const bcrypt = require('bcryptjs');

class UsuarioService {
    async crearUsuario(data) {
        if (await Usuario.findOne({ email: data.email })) {
            throw new Error('El email ya está registrado');
        }
        if (await Usuario.findOne({ identificacion: data.identificacion })) {
            throw new Error('La identificación ya está registrada');
        }
        const usuario = new Usuario(data);
        return await usuario.save();
    }

    async obtenerUsuarios() {

        return await Usuario.find();
    }

    async obtenerUsuarioPorId(id) {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        return usuario;
    }

    async actualizarUsuario(id, data) {
        if (data.password) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
        }

        const usuario = await Usuario.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });

        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        return usuario;
    }

    async cambiarEstadoUsuario(id, estado) {
        const usuario = await Usuario.findByIdAndUpdate(
            id,
            { estado },
            { new: true }
        );

        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        return usuario;
    }


    async eliminarUsuario(id) {
        const usuario = await Usuario.findByIdAndDelete(id);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        return usuario;
    }
}

module.exports = UsuarioService;