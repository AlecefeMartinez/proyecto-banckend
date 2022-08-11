const express = require('express')
const soccerController = require('../controllers/soccerController')
const validator = require('express-joi-validation').createValidator({})
const bodySchema = require('../validations/soccerBodyValidator')

const router = (Soccer) => {
  const soccerRouter = express.Router()

  const {
    getAllSoccer,
    getSoccerById,
    postSoccer,
    putSoccerById,
    deleteSoccerById
  } = soccerController(Soccer)

  soccerRouter
    .route('/soccer')
    .get(getAllSoccer)
    .post(validator.body(bodySchema), postSoccer)

  soccerRouter
    .route('/soccer/:id')
    .get(getSoccerById)
    .put(validator.body(bodySchema), putSoccerById)
    .delete(deleteSoccerById)

  return soccerRouter
}

module.exports = router
