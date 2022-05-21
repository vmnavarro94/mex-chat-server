const { Model, DataTypes } = require('sequelize')
const { PROFILE_TABLE } = require('./profile.model')

const PROFILE_CONTACT_TABLE = 'profile_contact'

const ProfileContactSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  profileId: {
    allowNull: false,
    type: DataTypes.UUID,
    field: 'profile_id',
    reference: {
      model: PROFILE_TABLE,
      key: 'id',
    },
  },
  contactId: {
    allowNull: false,
    type: DataTypes.UUID,
    field: 'contact_id',
    reference: {
      model: PROFILE_TABLE,
      key: 'id',
    },
  },
}

class ProfileContact extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROFILE_CONTACT_TABLE,
      modelName: 'ProfileContact',
      timestamps: false,
    }
  }
}

module.exports = { PROFILE_CONTACT_TABLE, ProfileContactSchema, ProfileContact }
