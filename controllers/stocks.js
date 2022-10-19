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

        const chart = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${searchStr}`)
            // .then(response => {
            //     const isJson = response.headers.get('content-type')?.includes('application/json');
            //     const chartData = isJson ? response.json(): null

            //     if(!response.ok) {
            //         const error = (chartData)
            //         return Promise.reject(error)
            //     }
            // })
            // .catch(error => {
            //     console.log('There was an error!', error)
            // })

        const chartData = await chart.json()
        
            //stock info
        const stockInfo = await fetch(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${searchStr}?modules=defaultKeyStatistics`)
        
        //get data from the API response resolve response
        // const chartData = await chart.json()
        //console.log(chartData.chart.result)

        //closeData price for this particular stock
        closeData = chartData.chart.result[0].indicators.quote[0].close
        console.log('closeData: ', closeData)
        let result = Object.keys(closeData)
            .map(function(key) {
                return closeData[key]
            })

        console.log(result)
        

        // console.log('stockPrice: ', stockPrice)
        // console.log(typeof(stockPrice))
        
        
        //loop through the array and push it into result
        // console.log('result', result)
        // console.log(typeof(result))


        //get the financial ratios to display in the frontend for later
        const stockData = await stockInfo.json()
        //console.log(stockData.quoteSummary.result[0].defaultKeyStatistics)

        // //get the individual details from the data like name and currency
        let name = chartData.chart.result[0].meta.symbol
        //console.log('name:', name)
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
        stock.push(enterpriseValue, forwardPE, profitMargins, floatShares, sharesOutstanding, sharesShort, shortRatio, beta, priceToBook)
        // console.log('stock', stock)
        // console.log(typeof(stock))

        let financialInfo = result.push(stock)
        let finance = JSON.stringify(financialInfo)
        console.log(finance)
        

        res.json(stock)
        return
    },
}
