const jwt = require('jsonwebtoken')

const AppError = require('./../utils/appError')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') return next()
  try {
    const token = req.headers.authorization.split(' ')[1] // Authorization: 'Bearer TOKEN' <- part of string
    if (!token) return next(new AppError('Authentication failed!', 401))
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.userData = { userId: decodedToken.userId, email: decodedToken.email }
    next()
  } catch (err) {
    return next(new AppError('Authentication failed!', 401))
  }
}
