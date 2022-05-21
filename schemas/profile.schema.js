const Joi = require('joi')

// All properties
const id = Joi.string().guid()
const name = Joi.string().min(3).max(30)
const profilePhoto = Joi.string()
const userId = Joi.number().integer()
const email = Joi.string().email()
const password = Joi.string().min(8)
const state = Joi.string()

// Methods
const createProfileSchema = Joi.object({
  name: name.required(),
  profilePhoto,
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  }),
  state,
})

const getProfileSchema = Joi.object({
  id: id.required(),
})

const updateProfileSchema = Joi.object({
  name,
  profilePhoto,
  userId,
})

const addContactSchema = Joi.object({
  contactId: id.required(),
})

module.exports = {
  getProfileSchema,
  createProfileSchema,
  updateProfileSchema,
  addContactSchema,
}
