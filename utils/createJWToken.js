const jwt = require('jsonwebtoken');
const chalk = require('chalk')

const { sign } = jwt

const createJWToken = (payloadObj) => {
  try {
    return sign(
      payloadObj,
      process.env.JWT_SECRET || 'PRO$TOY',
      {
        algorithm: 'HS256' // make drop errors
      }
    )
  } catch (er) {
    console.log(chalk.redBright('JWT_SIGN_ER'), er);
  }
}

module.exports = createJWToken;