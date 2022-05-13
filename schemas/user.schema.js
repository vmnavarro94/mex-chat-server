const Joi = require('joi')

const id = Joi.string().guid()
const email = Joi.string().email()
const password = Joi.string().min(8)

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
})

const updateUserSchema = Joi.object({
  email: email,
})

const getUserSchema = Joi.object({
  id: id.required(),
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
