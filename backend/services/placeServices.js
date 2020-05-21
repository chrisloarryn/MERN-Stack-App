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

exports.getPlaceByIdService =
    catchAsync(async (req, res, next) => {
        const {placeId} = req.params
        const place = await DUMMY_PLACES.find(place => place.id === placeId)
        if (!place) {
            return next(new AppError('Could not find a place for the provided user id.', 404))
        }
        res.status(200).json(
            {
                message: 'success',
                data: {
                    place
                }
            }
        )
    })

exports.getAllPlacesService =
    catchAsync(async (req, res, next) => {
        console.log('Get request in places')
        const places = await DUMMY_PLACES
        if (!places) {
            return next(new AppError('Could not find places.', 404))
        }
        res.status(200).json(
            {
                message: 'success',
                data: {
                    places
                }
            }
        )
    })

exports.getPlaceByUserIdService =
    catchAsync(async (req, res, next) => {
        const {userId} = req.params
        const place = await DUMMY_PLACES.find(place => place.creator === userId)
        if (!place) {
            return next(new AppError('Could not find a place for the provided user id.', 404))
        }
        res.status(200).json(
            {
                message: 'success',
                data: {
                    place
                }
            }
        )

    })

exports.createPlaceService = (req, res, next) => {
    console.log(req.body)
}