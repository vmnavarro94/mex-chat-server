const boom = require('@hapi/boom')

const { models } = require('../libs/sequelize')

class UserService {
  constructor() {}

  async create(data, scope = 'defaultScope') {
    const newUser = await models.User.scope(scope).create(data)
    return newUser
  }

  async find() {
    const users = await models.User.findAll()
    return users
  }

  async findByEmail(email, scope = 'defaultScope') {
    const user = await models.User.scope(scope).findOne({
      where: { email },
    })
    if (!user) {
      throw boom.notFound('User not found')
    }
    return user
  }

  async findOne(id, scope = 'defaultScope') {
    const user = await models.User.scope(scope).findByPk(id)
    if (!user) {
      throw boom.notFound('User not found')
    }
    return user
  }

  async update(id, changes, scope = 'defaultScope') {
    const user = await this.findOne(id, scope)
    const response = await user.update(changes)
    return response
  }

  async delete(id) {
    const user = await this.findOne(id)
    await user.destroy()
    return { id }
  }
}

module.exports = UserService
