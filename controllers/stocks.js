const jwt_decode = require('jwt-decode')
const jwt = require('jsonwebtoken')
const savedStocksModel = require('../models/saved_stocks')
const stockValidators = require('./validators/stocks')
const mongoose = require('mongoose')
const saved_stocks = require('../models/saved_stocks')

module.exports = {
    listStock: async (req, res) => {
        // perform API call to respective API from external party
        // list stock in JSON format
        const searchStr = req.body.search
        console.log('searchStr:', searchStr)

        const chart = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${searchStr}`)

        //if search query returns a null result catch the error
        if (chart == null) {
            console.log('err:', err)
            return res.json(409).msg({err: 'search is not valid'})
        }

        const chartData = await chart.json()
        
            //stock info
        const stockInfo = await fetch(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${searchStr}?modules=defaultKeyStatistics`)

        //if search query returns a null result catch the error
        if (stockInfo == null) {
            console.log('err:', err)
            return res.json(409).msg({err: 'search is not valid'})
        }
        
        //closeData price for this particular stock
        closeData = chartData.chart.result[0].indicators.quote[0].close
        console.log('closeData: ', closeData)
        let result = Object.keys(closeData)
            .map(function(key) {
                return closeData[key]
            })

        console.log('result:', result)

        //get the financial ratios to display in the frontend for later
        const stockData = await stockInfo.json()

        // //get the individual details from the data like name and currency
        let name = chartData.chart.result[0].meta.symbol
        let currency = chartData.chart.result[0].meta.currency

        // //get the individual financial ratio details
        let enterpriseValue = stockData.quoteSummary.result[0].defaultKeyStatistics.enterpriseValue.fmt
        let forwardPE = stockData.quoteSummary.result[0].defaultKeyStatistics.forwardPE.fmt
        let profitMargins = stockData.quoteSummary.result[0].defaultKeyStatistics.profitMargins.fmt
        let floatShares = stockData.quoteSummary.result[0].defaultKeyStatistics.floatShares.fmt
        let sharesOutstanding = stockData.quoteSummary.result[0].defaultKeyStatistics.sharesShort.fmt
        let sharesShort = stockData.quoteSummary.result[0].defaultKeyStatistics.sharesShort.fmt
        let shortRatio = stockData.quoteSummary.result[0].defaultKeyStatistics.shortRatio.fmt
        let beta = stockData.quoteSummary.result[0].defaultKeyStatistics.beta.fmt
        let priceToBook = stockData.quoteSummary.result[0].defaultKeyStatistics.priceToBook.fmt
        
        //push all the individuals to stock
        let stock = []
        stock.push(name, currency, enterpriseValue, forwardPE, profitMargins, floatShares, sharesOutstanding, sharesShort, shortRatio, beta, priceToBook)

        let financialInfo = stock.push(result)
        console.log('financialInfo:', financialInfo)
        let finance = JSON.stringify(financialInfo)
        console.log('finance:', finance)
        
        res.json(stock)
        return

        //API should give general enough information
        //If we put it into the array, it is very hard to display in web or mobile
    },

    saveStock: async(req, res) => {
        const saveId = req.body.id
        console.log('saveId:', saveId)
        const token = res.locals.userAuth
        let userId = mongoose.Types.ObjectId(token.data.id)
        console.log('userId', userId)

        //set up the userid
        const filter = { user: userId}

        //push the data into MongoDB
        const update = { $push : { stockId : saveId } }

        const validationAccount = await savedStocksModel.find(filter)

        //check if the account is there
        if (validationAccount === undefined) {
            await savedStocksModel.create({
                user: userId,
                stockId: null
            })
        } else {
            try {
                if (validationAccount[0].stockId.includes(saveId)) {
                    return res.json ("Stock already exists in your watchlist")
                }
                
            } catch (err) {
                console.log("The saved user data does not exist", err)
            }
        }

        await savedStocksModel.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true
        })

        return res.json("Stock added to your watchlist")
    },

    listWatchlist: async(req, res) => {
        const Watchlist = await savedStocksModel.find()
        res.json(Watchlist)
    },

    showWatchlist: async(req, res) => {
        const id = req.params.id
        const savedWatchList = await savedStocksModel.findById(id)
        res.json(savedWatchList)
    }
}
