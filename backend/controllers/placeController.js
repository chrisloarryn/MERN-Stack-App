const placeService = require('./../services/placeServices')

// 
exports.getAllPlaces = placeService.getAllPlacesService
exports.getPlaceByUserId = placeService.getPlaceByUserIdService

// CRUD operations
exports.createPlace = placeService.createPlaceService
exports.getPlaceById = placeService.getPlaceByIdService
exports.updatePlaceById = placeService.updatePlaceByIdService
exports.deletePlaceById = placeService.deletePlaceByIdService
