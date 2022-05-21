const { Model, DataTypes, Sequelize } = require('sequelize')
const { USER_TABLE } = require('./user.model')

const PROFILE_TABLE = 'profiles'

const ProfileSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    allowNull: false,
    unique: true,
    type: DataTypes.UUID,
    field: 'user_id',
    reference: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  profilePhoto: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'profile_photo',
  },
  state: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
}

class Profile extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' })
    this.belongsToMany(models.Profile, {
      as: 'contacts',
      through: models.ProfileContact,
      foreignKey: 'profileId',
      otherKey: 'contactId',
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROFILE_TABLE,
      modelName: 'Profile',
      timestamps: false,
    }
  }
}

module.exports = { PROFILE_TABLE, ProfileSchema, Profile }
