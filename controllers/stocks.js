const jwt_decode = require("jwt-decode");
const jwt = require("jsonwebtoken");
const savedStocksSchema = require("../models/saved_stocks");
const savedStocksModel = require("../models/save_stocks");
const stockValidators = require("./validators/stocks");
const mongoose = require("mongoose");
const saved_stocks = require("../models/saved_stocks");
const brain = require("brain.js");
const scaler = require("minmaxscaler");
const { forwardRef } = require("react");
const network = new brain.NeuralNetwork();

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

    network.train([
      // [age, visits, category]     [price]

      { input: [closeData[0], closeData[1], closeData[2]], output: [0.2] }, // 1 input
      { input: [closeData[4], closeData[5], closeData[6]], output: [0.3] }, // 2 input
      { input: [closeData[7], closeData[8], closeData[9]], output: [0.4] }, // 3 input
      { input: [closeData[10], closeData[11], closeData[12]], output: [0.5] }, // 4 input
      { input: [closeData[13], closeData[14], closeData[15]], output: [0.7] }, // 5 input
      { input: [closeData[16], closeData[17], closeData[18]], output: [0.8] }, // 6 input
    ]);

    //basically percentage that it deviates from the current price
    let gradient = network.run([0.2, 0.3, 0.5]);

    let constant = 50;

    let predictedPrice = gradient * closeData[0] + 50;

    console.log(`Price: ${predictedPrice}`);

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
      priceToBook,
    );

    let financialInfo = stock.push(result);
    console.log("financialInfo:", financialInfo);
    let finance = JSON.stringify(financialInfo);
    console.log("finance:", finance);

    let totalStockInfo = stock.push(predictedPrice)
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
    const saveId = req.body.id;
    console.log("saveId:", saveId);
    const id = req.params.id;
    console.log("id:", id);
    await savedStocksModel.findByIdAndDelete(id);
  },
};
