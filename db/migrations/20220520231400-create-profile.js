'use strict'

const { ProfileSchema, PROFILE_TABLE } = require('./../models/profile.model')
const { ProfileContactSchema, PROFILE_CONTACT_TABLE } = require('./../models/profile-contact.model')

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(PROFILE_TABLE, ProfileSchema)
    await queryInterface.createTable(PROFILE_CONTACT_TABLE, ProfileContactSchema)
  },

  async down(queryInterface) {
    await queryInterface.dropTable(PROFILE_TABLE)
    await queryInterface.dropTable(PROFILE_CONTACT_TABLE)
  },
}
