const { Strategy } = require('passport-local')
const bcrypt = require('bcrypt')
const boom = require('@hapi/boom')

const UserService = require('../../../services/user.service')
const service = new UserService()

const options = { usernameField: 'userName', passwordField: 'password' }

const LocalStrategy = new Strategy(options, async (email, password, done) => {
  try {
    const user = await service.findByEmail(email, 'allProperties')
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)
      delete user.dataValues.password
      if (isMatch) {
        done(null, user)
      } else {
        done(boom.unauthorized(), false)
      }
    } else done(boom.unauthorized(), false)
  } catch (error) {
    done(error, false)
  }
})

module.exports = LocalStrategy
