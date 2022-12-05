const stockData = require("./controllers/stocks")
const mocha = require('mocha')
const chai = require("chai");
const { assert } = require("joi");
const describe = mocha.describe
const expect = chai.expect;

describe('Test suit', function() {
    it("Promise test case", function() {
        stockData.testPromise().then(function(result) {
            expect(result).to.be.true
        })
    })
})