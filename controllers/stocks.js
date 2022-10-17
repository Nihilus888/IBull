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
        console.log('searchStr:', searchStr)

        //chart data
        const chart = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${searchStr}`)
        console.log('chart:', chart)

        //stock info
        const stockInfo = await fetch(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${searchStr}?modules=defaultKeyStatistics`)
        console.log('stockInfo: ', stockInfo)
        
        //get data from the API response
        const chartData = await chart.json()
        let result = []

        //get the financial ratios to display in the frontend for later
        const stockData = await stockInfo.json()
        let stock = []

        // //get the individual details from the data like name and currency
        // let name = chartData.chart.result.meta.symbol
        // let currency = chartData.chart.result.meta.currency

        // //get all the close prices for the searched stock
        // chartData.stock_listings.forEach((stock, idx) => {
        //     result[idx] = {
        //         dailyprice: stock.chart.result.indicators.quote.close
        //     }
        // })

        // //get the individual financial ratio details
        // let enterpriseValue = stockData.quoteSummary.result.enterpriseValue.fmt
        // let forwardPE = stockData.quoteSummary.result.forwardPE.fmt
        // let profitMargins = stockData.quoteSummary.result.profitMargins.fmt
        // let floatShares = stockData.quoteSummary.result.floatShares.fmt
        // let sharesOutstanding = stockData.quoteSummary.result.sharesShort.fmt
        // let sharesShort = stockData.quoteSummary.result.sharesShort.fmt
        // let shortRatio = stockData.quoteSummary.result.shortRatio.fmt
        // let beta = stockData.quoteSummary.results.beta.fmt
        // let priceToBook = stockData.quoteSummary.results.priceToBook.fmt

        res.json(result)
        return
    },
}
