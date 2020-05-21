const router = require('express').Router()

// Controllers
const placeController = require('./../../controllers/placeController')

router
    .get('/', placeController.getAllPlaces)
    .post('/', placeController.createPlace)

router.get('/:placeId', placeController.getPlaceById)
router.get('/user/:userId', placeController.getPlaceByUserId)

module.exports = router