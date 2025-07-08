const Router = require('express')

const router = new Router()
const authController = require('./authController')
const {check} = require('express-validator')
const authMiddlewere = require('./authMiddleware/middleware')


router.post('/registration',
    [
        check('username',"username cannot be empty").notEmpty(),
        check('password',"the password must be greater than 4 and not greater than 10").isLength({min:4,max:10})
    ],
    authController.registration)
router.post('/login',authController.login)
router.get('/users',authMiddlewere,authController.getUsers)

module.exports = router
