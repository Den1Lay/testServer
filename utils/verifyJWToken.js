const jwt = require('jsonwebtoken');

const { verify } = jwt;

const verifyJWToken = (token) => {
  return new Promise((resolve, reject) => {
    verify(
      token,
      process.env.JWT_SECRET || 'PRO$TOY',
      (er, decoded) => {
        if(er) {
          reject(er)
          return
        }
        resolve(decoded)
        return
      }
    )
  })
}

module.exports = verifyJWToken;