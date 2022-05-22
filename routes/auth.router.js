const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { config } = require('../config/config')
const ProfileService = require('../services/profile.service')

const router = express.Router()
const service = new ProfileService()

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req
      const payload = { sub: user.id }
      const token = jwt.sign(payload, config.jwtSecret)
      const profile = await service.findByUserId(user.id)
      res.json({ profile, token })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
