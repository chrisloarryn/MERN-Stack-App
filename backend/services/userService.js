const uuid = require('uuid').v4
const {validationResult} = require('express-validator')

const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

const User = require('./../models/user');

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Max Schwarz',
        email: 'test@example.com',
        password: 'testers'
    }
]

exports.getAllUsersService = catchAsync(async (req, res, next) => {
    const users = await User.find({}, '-password');

    if (!users || users.length === 0) {
        return next(
            new AppError('There are no users registered!.', 404)
        )
    }

    res.status(200).json({
        message: 'success',
        users: users.map(
            user => user.toObject({getters: true})
        )
    })
})

exports.signUpService = catchAsync(async (req, res, next) => {
    // Validate the request for not allow empty fields
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(
            new AppError('Invalid inputs passed, please check your data.', 422)
        )
    }
    const {name, email, password, places} = req.body
    const existingUser = await User.findOne({email: email});

    if (existingUser) {
        return next(
            new AppError('User exists already, please login instead.', 422)
        )
    }

    const createdUser = new User({
        name,
        email,
        image: 'https://www.w3schools.com/w3css/img_avatar3.png',
        password,
        places
    })

    await createdUser.save()
    res.status(201).json({
        message: 'success',
        user: createdUser.toObject({getters: true})
    })
})

exports.logInService = catchAsync(async (req, res, next) => {
    const {email, password} = req.body
    const existingUser = await User.findOne({email: email});

    if (!existingUser || existingUser.password !== password) {
        return next(
            new AppError('Invalid credentials, could not log you in.', 401)
        )
    }

    res.json({message: 'success', user: 'Successfully logged in'})
    /*
      {
      "name": "juan",
      "email": "test@test.cl",
      "password": "fdssdsd"
      }*/
})
