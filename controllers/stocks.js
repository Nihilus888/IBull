const jwt_decode = require("jwt-decode");
const jwt = require("jsonwebtoken");
const savedStocksSchema = require("../models/saved_stocks");
const savedStocksModel = require("../models/save_stocks");
const stockValidators = require("./validators/stocks");
const mongoose = require("mongoose");
const saved_stocks = require("../models/saved_stocks");
const scaler = require("minmaxscaler");
const { forwardRef } = require("react");
const { array } = require("joi");

module.exports = {
  listStock: async (req, res) => {
    // perform API call to respective API from external party
    // list stock in JSON format
    const searchStr = req.body.search;
    console.log("searchStr:", searchStr);

    const chart = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${searchStr}`
    );

    //if search query returns a null result catch the error
    if (chart == null) {
      console.log("err:", err);
      return res.json(409).msg({ err: "search is not valid" });
    }

    const chartData = await chart.json();

    //stock info
    const stockInfo = await fetch(
      `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${searchStr}?modules=defaultKeyStatistics`
    );

    //if search query returns a null result catch the error
    if (stockInfo == null) {
      console.log("err:", err);
      return res.json(409).msg({ err: "search is not valid" });
    }

    //closeData price for this particular stock
    closeData = chartData.chart.result[0].indicators.quote[0].close;
    console.log("closeData: ", closeData);

    if (closeData == undefined) {
      return;
    }

    let result = Object.keys(closeData).map(function (key) {
      return closeData[key];
    });

    console.log("result:", result);

    //get the financial ratios to display in the frontend for later
    const stockData = await stockInfo.json();

    // //get the individual details from the data like name and currency
    let name = chartData.chart.result[0].meta.symbol;
    let currency = chartData.chart.result[0].meta.currency;

    // //get the individual financial ratio details
    let enterpriseValue =
      stockData.quoteSummary.result[0].defaultKeyStatistics.enterpriseValue.fmt;
    let forwardPE =
      stockData.quoteSummary.result[0].defaultKeyStatistics.forwardPE.fmt;
    let profitMargins =
      stockData.quoteSummary.result[0].defaultKeyStatistics.profitMargins.fmt;
    let floatShares =
      stockData.quoteSummary.result[0].defaultKeyStatistics.floatShares.fmt;
    let sharesOutstanding =
      stockData.quoteSummary.result[0].defaultKeyStatistics.sharesShort.fmt;
    let sharesShort =
      stockData.quoteSummary.result[0].defaultKeyStatistics.sharesShort.fmt;
    let shortRatio =
      stockData.quoteSummary.result[0].defaultKeyStatistics.shortRatio.fmt;
    let beta = stockData.quoteSummary.result[0].defaultKeyStatistics.beta.fmt;
    let priceToBook =
      stockData.quoteSummary.result[0].defaultKeyStatistics.priceToBook.fmt;


      //Insertion Sort helper function for bucket sort
      function InsertionSort(array) {
        for (let i = 0; i < array.length; i++) {
            let valueToInsert = array[i];
            let holePosition = i;
    
            while (holePosition > 0 && array[holePosition - 1] > valueToInsert) {
                array[holePosition] = array[holePosition - 1];
                holePosition = holePosition - 1;
            }
            array[holePosition] = valueToInsert
        }
        return array;
    }
    

    //BucketSort implmentation for sorting values
      function BucketSort(array, bucketSize) {
        if (array.length === 0) {
            return array;
        }
    
        // Declaring vars
        var i,
            minValue = array[0],
            maxValue = array[0],
            bucketSize = bucketSize || 5;
    
        // Setting min and max values
        array.forEach(function (currentVal) {
            if (currentVal < minValue) {
                minValue = currentVal;
            } else if (currentVal > maxValue) {
                maxValue = currentVal;
            }
        })
    
        // Initializing buckets
        var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
        var allBuckets = new Array(bucketCount);
    
        for (i = 0; i < allBuckets.length; i++) {
            allBuckets[i] = [];
        }
    
        // Pushing values to buckets
        array.forEach(function (currentVal) {
            allBuckets[Math.floor((currentVal - minValue) / bucketSize)].push(currentVal);
        });
    
        // Sorting buckets
        array.length = 0;
    
        allBuckets.forEach(function (bucket) {
            InsertionSort(bucket);
            bucket.forEach(function (element) {
                array.push(element)
            });
        });
    
        return array;
    }
    
    sortedValue = (BucketSort(closeData, 10));
    
    //data cleaning by removing null values
    let stockValue = sortedValue.filter(element => {
      return element !== null
    })

    //Equation of Linear Regression
    //y^ = b0^ + b1^*x
    //b1^ = sxy / sx^2
    //b0^ = y mean - beta1^* x mean
    highestYValue = stockValue[300];
    lowestYValue = stockValue[0];
    yMean = (highestYValue - lowestYValue) / 2
    console.log('yMean:', yMean)

    totalX = closeData.reduce((a, b) => a + b, 0);
    xMean = totalX / closeData.length;
    console.log("xMean", xMean);

    //finding standard deviation
    let array = stockValue.map((k) => {
      return (k - yMean ** 2)
    })


    let sum = array.reduce((acc, curr)=> acc + curr, 0);
    console.log('sum:', sum)

    let variance = (sum / array.length)

    console.log('variance:', variance)

    let standardDeviation = Math.sqrt(variance)

    let b0 = xMean - standardDeviation * yMean

    let b1 = standardDeviation/variance
    
    let y = b0 + b1 * xMean

    let totalSum = stockValue.map((k) => {
      return (k - y)
    })


    console.log('Predicted price:', y)

    //push all the individuals to stock
    let stock = [];
    stock.push(
      name,
      currency,
      enterpriseValue,
      forwardPE,
      profitMargins,
      floatShares,
      sharesOutstanding,
      sharesShort,
      shortRatio,
      beta,
      priceToBook
    );

    let financialInfo = stock.push(result);
    console.log("financialInfo:", financialInfo);
    let finance = JSON.stringify(financialInfo);
    console.log("finance:", finance);

    let totalStockInfo = stock.push(y)
    let totalfinanceInfo = JSON.stringify(totalStockInfo)

    res.json(stock);
    return;

    //API should give general enough information
    //If we put it into the array, it is very hard to display in web or mobile
  },

  saveStock: async (req, res) => {
    console.log("req.body", req.body);
    const saveId = req.body.id;
    console.log("saveId:", saveId);
    const token = res.locals.userAuth;
    let userId = mongoose.Types.ObjectId(token.data.id);
    console.log("userId", userId);

    //set up the userid
    const filter = { user: userId };

    //push the data into MongoDB, probably will explore this further
    const update = { $push: { stockId: saveId, data: req.body } };

    const saveStock = await savedStocksModel.find(filter);
    console.log("saveStock", saveStock);

    //check if the save stock is there
    if (saveStock === undefined) {
      console.log("saveStock is undefined");
      await savedStocksModel.create({
        user: userId,
        stockId: null,
      });
    } else {
      try {
        //idempotency
        if (saveStock[0].stockId.includes(saveId)) {
          return res.json("Stock already exists in your watchlist");
        }
      } catch (err) {
        console.log("The saved user data does not exist", err);
      }
    }

    await savedStocksModel.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });
    console.log("Stock added to watchlist");
    return res.json("Stock added to your watchlist");
  },

  listWatchlist: async (req, res) => {
    // list all jobs in JSON format
    const token = res.locals.userAuth;
    let userId = mongoose.Types.ObjectId(token.data.id);
    console.log("userId", userId);
    const filter = { user: userId };

    const savedWatchListData = await savedStocksModel.find(filter);
    console.log("savedWatchListData: ", savedWatchListData);
    res.json(savedWatchListData);
  },

  showWatchlist: async (req, res) => {
    const id = req.params.id;
    console.log("id:", id);
    const filter = { user: id };
    const savedWatchList = await savedStocksModel.find(filter);
    console.log("savedWatchList:", savedWatchList);
    res.json(savedWatchList);
  },

  removeWatchlist: async (req, res) => {
    // find and remove saved job data from database collection
    const body = req.body;
    console.log("body:", body);
    const id = req.params.id;
    console.log("id:", id);
    // await savedStocksModel.findByIdAndDelete(id);
    try {
      const response = await savedStocksModel.updateOne(
        { user: mongoose.Types.ObjectId(id) },
        {
          $pull: {
            stockId: req.body.ticker
          }
        }
      )
    } catch (error) {
      console.log(error)
    }
  },
};
