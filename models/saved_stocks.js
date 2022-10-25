const mongoose = require('mongoose')

const savedStocksSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },

    name: {
       type: String,
       required: true,
    },

    symbol: {
        type: String,
        required: true,
        unique: true,
    },

    currency: {
        type: String,
    },

    price: {
        type: Number,
        required: true,
    },

    enterpriseValue: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("savedStocks", savedStocksSchema)