const express = require('express')
const passport = require('passport')

const ProfileService = require('../services/profile.service')
const validatorHandler = require('../middlewares/validator.handler')
const {
  updateProfileSchema,
  createProfileSchema,
  getProfileSchema,
  addContactSchema,
} = require('../schemas/profile.schema')
const { extractIdFromJwt } = require('../utils/auth/JwtAuth')

const router = express.Router()
const service = new ProfileService()

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (_req, res, next) => {
    try {
      const profiles = await service.find()
      res.json(profiles)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/contacts',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const id = extractIdFromJwt(req.headers.authorization)
      const contacts = await service.getContacts(id)
      res.json(contacts)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProfileSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const profile = await service.findOne(id)
      res.json(profile)
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/',
  validatorHandler(createProfileSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newProfile = await service.create(body)
      res.status(201).json(newProfile)
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/contacts',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(addContactSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const userId = extractIdFromJwt(req.headers.authorization)
      const newContact = await service.addContact({
        ...body,
        userId,
      })
      res.status(201).json(newContact)
    } catch (error) {
      next(error)
    }
  }
)

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProfileSchema, 'params'),
  validatorHandler(updateProfileSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const profile = await service.update(id, body)
      res.status(201).json(profile)
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProfileSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      await service.delete(id)
      res.status(201).json({ id })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
