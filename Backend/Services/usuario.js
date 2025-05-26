const Usuario = require('../Models/UsuarioMol');
const { generarJWT } = require('../helpers/jwt');

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

  async autenticarUsuario(email, password) {
    const usuario = await Usuario.findOne({ email }).select('+password');
    if (!usuario || !(await usuario.compararPassword(password))) {
      throw new Error('Credenciales incorrectas');
    }
    if (!usuario.estado) {
      throw new Error('Usuario inactivo');
    }
    const token = await generarJWT(usuario.id);
    return { usuario, token };
  }

  async obtenerUsuarios(activos = true) {
    const filtro = activos ? { estado: true } : {};
    return await Usuario.find(filtro);
  }

  async obtenerUsuarioPorId(id) {
    return await Usuario.findById(id);
  }

  async actualizarUsuario(id, data) {
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }
    return await Usuario.findByIdAndUpdate(id, data, { new: true });
  }

  async cambiarEstadoUsuario(id, estado) {
    return await Usuario.findByIdAndUpdate(id, { estado }, { new: true });
  }

  async eliminarUsuario(id) {
    return await Usuario.findByIdAndDelete(id);
  }
}

module.exports = UsuarioService;
