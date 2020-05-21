const placeService = require('./../services/placeServices')

exports.getAllPlaces = placeService.getAllPlacesService
exports.getPlaceById = placeService.getPlaceByIdService
exports.getPlaceByUserId = placeService.getPlaceByUserIdService
exports.createPlace = placeService.createPlaceService