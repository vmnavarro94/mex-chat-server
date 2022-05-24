const boom = require('@hapi/boom')

const { models } = require('../libs/sequelize')

class ProfileService {
  constructor() {}

  async create(profile, scope = 'defaultScope') {
    const newProfile = await models.Profile.scope(scope).create(profile, {
      include: ['user'],
    })
    return newProfile
  }

  async find() {
    const profiles = await models.Profile.findAll({ include: ['user'] })
    return profiles
  }

  async findByEmail(email, scope = 'defaultScope') {
    const profile = await models.Profile.scope(scope).findOne({
      where: { email },
    })
    if (!profile) {
      throw boom.notFound('Profile not found')
    }
    return profile
  }

  async findOne(id, scope = 'defaultScope') {
    const profile = await models.Profile.scope(scope).findByPk(id, {
      include: ['user'],
    })
    if (!profile) {
      throw boom.notFound('Profile not found')
    }
    return profile
  }

  async findByUserId(id, scope = 'defaultScope') {
    const profile = await models.Profile.scope(scope).findOne({
      where: { userId: id },
      include: ['user'],
    })
    if (!profile) {
      throw boom.notFound('Profile not found')
    }
    return profile
  }

  async addContact(data, scope = 'defaultScope') {
    const { contactId, userId } = data
    const wantedContact = await this.findOne(contactId)
    if (!wantedContact) {
      throw boom.notFound('Desired contact not found')
    }
    const profile = await this.findByUserId(userId)
    const profileContact = await models.ProfileContact.scope(scope).create({
      profileId: profile.id,
      contactId,
    })
    return profileContact
  }

  async getContacts(id, scope = 'defaultScope') {
    const profile = await this.findByUserId(id, scope)
    const profileContacts = await models.ProfileContact.findAll({
      where: { profileId: profile.id },
    })
    const findOne = this.findOne
    const contacts = await Promise.all(
      profileContacts.map(async (profileContact) => {
        const profile = await findOne(profileContact.contactId, scope)
        if (profile) {
          return profile
        }
      })
    )
    return { contacts }
  }

  async update(id, changes, scope = 'defaultScope') {
    const profile = await this.findOne(id, scope)
    const response = await profile.update(changes)
    return response
  }

  async delete(id) {
    const profile = await this.findOne(id)
    await profile.destroy()
    return { id }
  }
}

module.exports = ProfileService
