//dotenv file to encode password
require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose")
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000;
const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@generalassembly.odxzs.mongodb.net`;

//express use
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({
    origin: '*'
  }))

//listening port
app.listen(port, async () => {
    try {
      await mongoose.connect(connStr, { dbName: "I-Bull" });
    } catch (err) {
      console.log(err);
      console.log(`Failed to connect to DB`);
      process.exit(1);
    }
    console.log("Connected to DB");
    console.log(`Example app listening on port ${port}`);
  });
  