
const router = require('express').Router()

const apiPlacesRouter = require('./api/placeRoutes')
const apiUsersRouter = require('./api/userRoutes')

router.use('/places', apiPlacesRouter)
router.use('/users', apiUsersRouter)

module.exports = router