const express = require('express')
const userController = require('../controllers/user_controller')
const auth_middleware = require('../middleware/auth_middleware')
const user = require('../models/user')

const router = express.Router()

//register route
router.post('/register', userController.register)

//login route 
router.post('/login', userController.login)

module.exports = router;
