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

module.exports = { verifyRequestAuth }
