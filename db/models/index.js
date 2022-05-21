const { User, UserSchema } = require('./user.model')
const { Profile, ProfileSchema } = require('./profile.model')
const {
  ProfileContact,
  ProfileContactSchema,
} = require('./profile-contact.model')

const setupModels = (sequelize) => {
  // inits
  User.init(UserSchema, User.config(sequelize))
  Profile.init(ProfileSchema, Profile.config(sequelize))
  ProfileContact.init(ProfileContactSchema, ProfileContact.config(sequelize))

  // associations
  User.associate(sequelize.models)
  Profile.associate(sequelize.models)
}

module.exports = setupModels
