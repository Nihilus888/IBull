const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const userValidators = require('../controllers/validators/users')
const mongoose = require('mongoose')
const user = require('../models/user')

module.exports = {
    register: async (req, res) => {
        //get validated values from req.body
        const validateUser = userValidators.createUser.validate(req.body)
        console.log("validateUser:", validateUser)

        //if error in validating user
        if(validateUser.error) {
            console.log('validateUser.error: ', validateUser.error)
            res.send(validateUser.error)
            return   
        }
    }
}