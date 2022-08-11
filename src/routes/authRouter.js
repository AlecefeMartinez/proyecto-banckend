const express = require('express')
const authController = require('../controllers/authController')

const router = (Soccer) => {
  const authRouter = express.Router()

  const { logIn, register } = authController(Soccer)

  authRouter.route('/auth/login').post(logIn)

  authRouter.route('/auth/register').post(register)

  return authRouter
}

module.exports = router
