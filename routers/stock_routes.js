const express = require('express')
const stockController = require("../controllers/stocks")
const auth_middleware = require('../middleware/auth_middleware')

const router = express.Router()

//list stock from search
router.post('/search', stockController.listStock)

//save stock route
router.post('/saved', auth_middleware, stockController.saveStock)

//view the stock
router.get('/stockView', stockController.listStock)

module.exports = router