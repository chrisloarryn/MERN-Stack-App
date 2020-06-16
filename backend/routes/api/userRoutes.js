const router = require('express').Router()
const {check} = require('express-validator')

// Controllers
const userController = require('./../../controllers/userController')

router.get('/', userController.getAllUsers)

router.post(
    '/signup',
    [
        check('name')
            .not()
            .isEmpty(),
        check('email')
            .normalizeEmail() // Test@test.com => test@test.com
            .isEmail(),
        check('password').isLength({min: 6})
    ],
    userController.signup
);
router.post('/login', userController.login)

module.exports = router
