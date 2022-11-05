const express = require('express')
const stockController = require("../controllers/stocks")
const auth_middleware = require('../middleware/auth_middleware')
const cors = require('cors')

const router = express.Router()

//list stock from search
router.post('/search', stockController.listStock)

//save stock route
router.post('/saved', auth_middleware, stockController.saveStock)

//get saved watchlist
router.get('/saved/:id', auth_middleware, stockController.showWatchlist)

//delete specific watchlist
router.patch('/saved/:id', auth_middleware, stockController.removeWatchlist)

module.exports = router