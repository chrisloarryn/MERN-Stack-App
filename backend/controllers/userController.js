const userService = require('../services/userService')

exports.getAllUsers = userService.getAllUsersService
exports.signup = userService.signUpService
exports.login = userService.logInService