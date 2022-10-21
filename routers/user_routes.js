const express = require('express')
const userController = require('../controllers/user_controller')
const auth_middleware = require('../middleware/auth_middleware')
const user = require('../models/user')

const router = express.Router()

//register route
router.post('/register', userController.register)

//login route 
router.post('/login', userController.login)

//logout route
router.post('/logout', auth_middleware, userController.logout)

//profile route
router.get('/profile/:id', auth_middleware, userController.profile)

//edit profile route
router.patch('/profile/:id', auth_middleware, userController.editProfile)

module.exports = router;
