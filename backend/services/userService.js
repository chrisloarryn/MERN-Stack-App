const uuid = require('uuid').v4
const { validationResult } = require('express-validator')

const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Max Schwarz',
    email: 'test@example.com',
    password: 'testers'
  }
]

exports.getAllUsersService = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: 'success',
    users: DUMMY_USERS
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
  const { name, email, password } = req.body
  const hasUser = await DUMMY_USERS.find(user => user.email === email)
  if (hasUser) {
    return next(
      new AppError('Could not create user, email already exists.', 401)
    )
  }

  const createdUser = {
    id: uuid(),
    name,
    email,
    password
  }

  DUMMY_USERS.push(createdUser)

  res.status(201).json({
    message: 'success',
    user: createdUser
  })
})

exports.logInService = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  const identifiedUser = DUMMY_USERS.find(user => user.email === email)
  if (!identifiedUser || identifiedUser.password !== password) {
    return next(
      new AppError('Could not identify user, credentials seem to be wrong', 404)
    )
  }
  res.json({ message: 'success', user: 'Successfully logged in' })
  /* 
    {
	"name": "juan",
	"email": "test@test.cl",
    "password": "fdssdsd"
    }*/
})
