const { User, UserSchema } = require('./user.model')

const setupModels = (sequelize) => {
  // inits
  User.init(UserSchema, User.config(sequelize))

  // associations
  User.associate(sequelize.models)
}

module.exports = setupModels
