const bcrypt = require('bcrypt')
const { Model, DataTypes, Sequelize } = require('sequelize')

const USER_TABLE = 'users'

const UserSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
}

class User extends Model {
  static associate(models) {
    this.hasOne(models.Profile, {
      as: 'profile',
      foreignKey: 'userId',
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
      defaultScope: {
        attributes: {
          exclude: ['password'],
        },
      },
      scopes: {
        allProperties: {
          attributes: ['id', 'email', 'password'],
        },
      },
      hooks: {
        beforeCreate: async (user) => {
          const password = await bcrypt.hash(user.password, 10)
          user.password = password
        },
        afterCreate: (user) => {
          delete user.dataValues.password
        },
      },
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }
