const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      message: 'No hay token en la petición'
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token no válido'
    });
  }
};

module.exports = { validarJWT };