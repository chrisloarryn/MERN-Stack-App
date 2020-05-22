const router = require('express').Router()

// Controllers
const placeController = require('./../../controllers/placeController')

router
    .get('/', placeController.getAllPlaces)
    .post('/', placeController.createPlace)

    
router
    .get('/:placeId', placeController.getPlaceById)
    .patch('/:placeId', placeController.updatePlaceById)
    //.delete('/:placeId', placeController.deletePlaceById)

router.get('/user/:userId', placeController.getPlaceByUserId)

module.exports = router