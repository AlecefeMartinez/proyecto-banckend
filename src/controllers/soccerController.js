const bcrypt = require('bcrypt')
const httpStatus = require('../helpers/httpStatus')

const soccerController = (Soccer) => {
  const getAllSoccer = async (req, res, next) => {
    try {
      const { query } = req

      const response = await Soccer.find(query)

      return res.status(httpStatus.OK).json(response)
    } catch (err) {
      next(err)
    }
  }

  const postSoccer = async (req, res, next) => {
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

  const putSoccerById = async (req, res, next) => {
    try {
      const { body, params } = req

      const checkData = await Soccer.find({
        _id: params.id
      })

      if (checkData === null) {
        return res
          .status(httpStatus.FORBIDDEN)
          .send('No data found with the provided ID.')
      }

      const encryptedPassword = await bcrypt.hash(body.password, 10)

      await Soccer.updateOne(
        {
          _id: params.id
        },
        {
          $set: {
            firstName: body.firstName,
            lastName: body.lastName,
            username: body.username,
            password: encryptedPassword,
            email: body.email,
            address: body.address,
            phone: body.phone
          }
        }
      )

      return res.status(httpStatus.CREATED).send('Data successful updated')
    } catch (err) {
      next(err)
    }
  }

  const getSoccerById = async (req, res, next) => {
    try {
      const { params } = req

      const response = await Soccer.findById(params.id)

      return res.status(httpStatus.OK).json(response)
    } catch (err) {
      next(err)
    }
  }

  const deleteSoccerById = async (req, res, next) => {
    try {
      const { params } = req

      await Soccer.findByIdAndDelete(params.id)

      return res.status(httpStatus.OK).send('Data successful deleted')
    } catch (err) {
      next(err)
    }
  }

  return {
    getAllSoccer,
    getSoccerById,
    postSoccer,
    putSoccerById,
    deleteSoccerById
  }
}

module.exports = soccerController
