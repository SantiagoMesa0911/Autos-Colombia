  const jwt = require('jsonwebtoken');
  const { jwt_secret } = require('../Config');

  const validarJWT = (req, res, next) => {

    const authHeader = req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'No hay token en la petición o formato invalido'
      });
    }

    const token = authHeader.split(' ')[1]

    try {
      const { id } = jwt.verify(token, jwt_secret);
      req.usuarioId = id;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Token no válido'
      });
    }
  };

  module.exports = { validarJWT };