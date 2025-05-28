const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../Config');
const generarJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      jwt_secret,
      { expiresIn: '12h' },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el token');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generarJWT };