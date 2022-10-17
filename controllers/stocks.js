const jwt_decode = require('jwt-decode')
const jwt = require('jsonwebtoken')
const savedStocksSchema = require('../models/saved_stocks')
const stockValidators = require('./validators/stocks')
const mongoose = require('mongoose')

module.exports = {
    listStock: async (req, res) => {
        // perform API call to respective API from external party
        // list stock in JSON format
        const searchStr = req.body.search

        //chart data
        const chartData = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${searchStr}`)

        //get data from the API response
        const data = await chartData.json()
        let result = []

        //get the individual details from the data
        let name = data.chart.result.meta.symbol
        let currency = data.chart.result.meta.currency

        //get all the close prices for the searched stock
        data.stock_listings.forEach((stock, idx) => {
            result[idx] = {
                dailyprice: stock.chart.result.indicators.quote.close
            }
        })
    }
}
