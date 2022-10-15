const express = require('express')
const userController = require('../controllers/user_controller')
const user = require('../models/user')

const router = express.Router()

//register route
router.post('/register', userController.register)