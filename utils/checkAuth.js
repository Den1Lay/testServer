const verifyJWToken = require('./verifyJWToken');

const checkAuth = (req, res, next) => {
  const token = req.headers?.token || ''

  verifyJWToken(token).then((decode) => {
    req.headers.decode = decode;
    next();

  }).catch(er => {
    res.json({status: 'error', message: 'forbidden'})
  })
}

module.exports = checkAuth;