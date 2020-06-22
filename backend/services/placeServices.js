const uuid = require('uuid').v4
const {validationResult} = require('express-validator')
const mongoose = require('mongoose')

const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const getCoordsForAddress = require('./../utils/location')
const Place = require('../models/place')
const User = require('./../models/user')

exports.getPlaceByIdService = catchAsync(async (req, res, next) => {
    const {placeId} = req.params
    // const place = await Place.findById(placeId)
    let place
    // try {
    place = await Place.findById(placeId)
    // } catch (error) {
    //   return next(
    //     new AppError('Something went wrong, could not find place.', 500)
    //   )
    // }
    if (!place || place.length === 0) {
        return next(
            new AppError('Could not find a place for the provided place id.', 404)
        )
    }
    res.status(200).json({
        message: 'success',
        data: {
            place: place.toObject({getters: true})
        }
    })
})

exports.updatePlaceByIdService = catchAsync(async (req, res, next) => {
    const {placeId} = req.params
    // Validate the request for not allow empty fields
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(
            new AppError('Invalid inputs passed, please check your data.', 422)
        )
    }
    const {title, description} = req.body


    const place = await Place.findById(placeId)
    if (!place || place.length === 0) {
        return next(
            new AppError('Could not find a place to update for the provided place id.', 404)
        )
    }

    place.title = title
    place.description = description

    place.save();

    res.status(200).json({
        message: 'success',
        data: {
            place: place.toObject({getters: true})
        }
    })
})

exports.deletePlaceByIdService = catchAsync(async (req, res, next) => {
    const {placeId} = req.params

    let place;

    try {
        place = await Place.findById(placeId).populate('creator')
    } catch (err) {
        return next(new AppError('Finding place failed, please try again.', 500))
    }

    if (!place) {
        return next(new AppError('Could not find a place for the provided id.', 404))
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({ session: sess });
        place.creator.places.pull(place);
        await place.creator.save({ session: sess });
        await sess.commitTransaction();
    } catch(err) {
        return next(new AppError('Deleting place failed, please try again.', 500))
    }

    

    // place.remove({_id: placeId})

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
            places: places.map(p => p.toObject({getters: true}))
        }
    })
})

exports.getPlacesByUserIdService = catchAsync(async (req, res, next) => {
    const {userId} = req.params

    // let places
    let userWithPlaces;
    try {
        userWithPlaces = await User.findById(userId).populate('places')
    } catch (err) {
        return next(
            new AppError('Fetching places failed, please try again later.', 404)
        )
    }
    // const places = await Place.find({creator: userId})
    if (!userWithPlaces || userWithPlaces.places.length === 0) {
        return next(
            new AppError('Could not find a places for the provided user id.', 404)
        )
    }
    res.status(200).json({
        message: 'success',
        data: {
            places: userWithPlaces.places.map(p => p.toObject({getters: true}))
        }
    })
})

exports.createPlaceService = catchAsync(async (req, res, next) => {
    // Validate the request for not allow empty fields
    console.log(req.body);
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(
            next(new AppError('Invalid inputs passed, please check your data.', 422))
        )
    }

    const {title, description, address, creator} = req.body
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

    let user;
    try {
        user = await User.findById(creator)
    } catch (err) {
        return next(new AppError('Creating place failed, please try again(user doesn\'t exist).', 500))
    }

    if(!user) return next(new AppError('Could not find user for the provided id.', 404))

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({ session: sess })
        user.places.push(createdPlace);
        await user.save({ session: sess })
        await sess.commitTransaction();
    } catch (err) {
        return next(new AppError('Creating place failed, please try again.', 500))
    }
    // catchAsync(
    //   await createdPlace.save()
    // )

    res.status(201).json({
        message: 'success',
        place: createdPlace.toObject({getters: true})
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
