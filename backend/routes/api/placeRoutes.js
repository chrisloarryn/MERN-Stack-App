const router = require('express').Router()
const { check } = require('express-validator')

// Controllers && Middleware
const checkAuth = require('./../../middleware/check-auth')
const placeController = require('./../../controllers/placeController')
const fileUpload = require('./../../middleware/file-upload')

router.get('/:placeId', placeController.getPlaceById)
router.get('/user/:userId', placeController.getPlacesByUserId)

router.use(checkAuth)

router
  .get('/', placeController.getAllPlaces)
  .post(
    '/',
    fileUpload.single('image'),
    [
      check('title').not().isEmpty(),
      check('description').isLength({ min: 5 }),
      check('address').not().isEmpty(),
    ],
    placeController.createPlace
  )

router
  .patch(
    '/:placeId',
    [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
    placeController.updatePlaceById
  )
  .delete('/:placeId', placeController.deletePlaceById)

module.exports = router
