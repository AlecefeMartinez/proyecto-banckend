const bcrypt = require('bcrypt')
const generateToken = require('../helpers/generateToken')
const httpStatus = require('../helpers/httpStatus')

const authController = (Soccer) => {
  const logIn = async (req, res, next) => {
    try {
      const { body } = req

      const user = await Soccer.findOne({
        username: body.username
      })
      if (
        user === null ||
        !(await bcrypt.compare(body.password, user.password))
      ) {
        return res.status(httpStatus.FORBIDDEN).send('Invalid credentials')
      }

      const token = generateToken()

      return res.status(httpStatus.OK).json({
        status: 'OK',
        token
      })
    } catch (err) {
      next(err)
    }
  }

  const register = async (req, res, next) => {
    try {
      const { body } = req

      const encryptedPassword = await bcrypt.hash(body.password, 10)

      const encryptedData = {
        ...body,
        password: encryptedPassword
      }

      const soccer = await new Soccer(encryptedData)

      await soccer.save()

      return res.status(httpStatus.CREATED).json(soccer)
    } catch (err) {
      next(err)
    }
  }

  return { logIn, register }
}

module.exports = authController
