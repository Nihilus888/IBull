const mongoose = require("mongoose");

const saveStockSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },

  stockId: {
    type: []
  }
});

module.exports = mongoose.model("saveStocks", saveStockSchema);