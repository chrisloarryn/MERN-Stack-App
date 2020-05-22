const uuid = require('uuid').v4

const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    location: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u1'
  },
  {
    id: 'p8',
    title: 'Empire State vBuilding',
    description: 'One of the most famous sky scrapers in the world!',
    location: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u5'
  }
]

exports.getPlaceByIdService = catchAsync(async (req, res, next) => {
  const { placeId } = req.params
  const place = await DUMMY_PLACES.find(place => place.id === placeId)
  if (!place) {
    return next(
      new AppError('Could not find a place for the provided user id.', 404)
    )
  }
  res.status(200).json({
    message: 'success',
    data: {
      place
    }
  })
})

exports.updatePlaceByIdService = catchAsync(async (req, res, next) => {
  const { title, description } = req.body
  const { placeId } = req.params
  const updatedPlace = {... await DUMMY_PLACES.find(place => place.id === placeId)}
  const placeIndex = await DUMMY_PLACES.findIndex(place => place.id === placeId)
  updatedPlace.title = title
  updatedPlace.description = description

  DUMMY_PLACES[placeIndex] = updatedPlace

  if (!updatedPlace) {
    return next(
      new AppError('Could not find a place for the provided user id.', 404)
    )
  }
  res.status(200).json({
    message: 'success',
    data: {
      place: updatedPlace
    }
  })
})

exports.getAllPlacesService = catchAsync(async (req, res, next) => {
  const places = await DUMMY_PLACES
  if (!places) {
    return next(new AppError('Could not find places.', 404))
  }
  res.status(200).json({
    message: 'success',
    data: {
      places
    }
  })
})

exports.getPlaceByUserIdService = catchAsync(async (req, res, next) => {
  const { userId } = req.params
  const place = await DUMMY_PLACES.find(place => place.creator === userId)
  if (!place) {
    return next(
      new AppError('Could not find a place for the provided user id.', 404)
    )
  }
  res.status(200).json({
    message: 'success',
    data: {
      place
    }
  })
})

exports.createPlaceService = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator
  }
  DUMMY_PLACES.push(createdPlace) // unshift(createdPlace)
  res.status(201).json({
    message: 'success',
    place: createdPlace
  })
}
