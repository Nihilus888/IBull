const express = require('express')
const stockController = require("../controllers/stocks")
const auth_middleware = require('../middleware/auth_middleware')

const router = express.Router()

//list stock from search
router.post('/search', stockController.listStock)

module.exports = router