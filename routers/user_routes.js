const express = require('express')
const user = require('../models/user')

const router = express.Router()

//register route
router.post('/register', userController.register)