const jwt = require('jsonwebtoken')
const { config } = require('../../config/config')

const verifyRequestAuth = (token) => {
  if (token) {
    try {
      const decode = jwt.verify(token, config.jwtSecret)
      if (decode) {
        return decode.sub
      }
    } catch (error) {
      console.log(error)
    }
  }
  return null
}

const extractIdFromJwt = (authorization) => {
  const token = authorization.split(' ')[1]
  return verifyRequestAuth(token)
}

module.exports = { verifyRequestAuth, extractIdFromJwt }
