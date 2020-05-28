const uuid = require('uuid').v4
const { validationResult } = require('express-validator')

const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const getCoordsForAddress = require('./../utils/location')
const Place = require('../models/place')

let DUMMY_PLACES = [
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
  // const place = await Place.findById(placeId)
  let place
  try {
    place = await Place.findById(placeId)
  } catch (error) {
    return next(
      new AppError('Something went wrong, could not find place.', 500)
    )
  }
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
  const { placeId } = req.params
  // Validate the request for not allow empty fields
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new AppError('Invalid inputs passed, please check your data.', 422)
    )
  }
  const { title, description } = req.body
  const updatedPlace = {
    ...(await DUMMY_PLACES.find(place => place.id === placeId))
  }
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

exports.deletePlaceByIdService = catchAsync(async (req, res, next) => {
  const { placeId } = req.params
  if (!DUMMY_PLACES.find(place => place.id === placeId)) {
    return next(new AppError('Could not find a place for that id.', 404))
  }
  DUMMY_PLACES = DUMMY_PLACES.filter(place => place.id !== placeId)

  res.status(200).json({
    message: 'success',
    data: null
  })
})

exports.getAllPlacesService = catchAsync(async (req, res, next) => {
  const places = await Place.find()
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

exports.getPlacesByUserIdService = catchAsync(async (req, res, next) => {
  const { userId } = req.params
  const places = await DUMMY_PLACES.filter(place => place.creator === userId)
  if (!places || places.length === 0) {
    return next(
      new AppError('Could not find a places for the provided user id.', 404)
    )
  }
  res.status(200).json({
    message: 'success',
    data: {
      places
    }
  })
})

exports.createPlaceService = catchAsync(async (req, res, next) => {
  // Validate the request for not allow empty fields
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      next(new AppError('Invalid inputs passed, please check your data.', 422))
    )
  }

  const { title, description, address, creator } = req.body

  let coordinates
  try {
    coordinates = await getCoordsForAddress(address)
  } catch (err) {
    return next(new AppError('Invalid coordinates', 503))
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      'https://static2.abc.es/media/tecnologia/2020/01/20/whatsapp-youtube-kHFB--620x349@abc.jpg',
    creator
  })

  try {
    await createdPlace.save()
  } catch (err) {
    next(new AppError('Creating place failed, please try again.', 500))
  }
  // catchAsync(
  //   await createdPlace.save()
  // )

  res.status(201).json({
    message: 'success',
    place: createdPlace
  })
})

/**
 * {
	"title": "Wall Street Exchange",
	"description": "Where the money lives",
	"address": "fs",
	"coordinates": {
      "lat": 40.7484474,
      "lng": -73.9871516
    },
	"address": "sfd",
	"creator": "u5"
}
 * 
 * */
