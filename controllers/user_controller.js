const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const userValidators = require('../controllers/validators/users')
const mongoose = require('mongoose')
const user = require('../models/user')

module.exports = {
    register: async (req, res) => {
        //get validated values from req.body
        const validateUser = userValidators.createUser.validate(req.body);
        console.log("validatedUser:", validateUser);
    
        if (validateUser.error) {
          console.log("validateUser.error: ", validateUser.error);
          res.send(validateUser.error);
          return;
        }
    
        //get values from validated users
        const validatedValues = validateUser.value;
        console.log("validatedValues: ", validatedValues);
        console.log("validatedValuesSkill", validatedValues.skills);
    
        //find validated users from database
        try {
          const user = await userModel.findOne({ email: validatedValues.email });
          //if user email already exists in database, return error
          if (user) {
            return res.status(409).json({ error: "user already exists" });
          }
        } catch (err) {
          console.log("find err: ", err);
          return res.status(500).json({ error: "unable to get user" });
        }
    
        //check if password is the same
    
        if (validatedValues.password !== validatedValues.confirmPassword) {
          res.send(
            "Password and confirm password does not match. Please try again"
          );
          return;
        }
    
    
        //else encrypt password with hash and store all their other details as well into database
        const passwordHash = await bcrypt.hash(req.body.password, 5);
        const user = { ...req.body, password: passwordHash };
        console.log("passwordHash: ", passwordHash);
        console.log("user: ", user);
    
        //if error in creating user, return error
        //else continue and return json format
        try {
          await userModel.create(user);
          console.log("successfully created user");
        } catch (err) {
          console.log("create err: ", err);
          return res.status(500).json({ error: "unable to register user" });
        }
        return res.json("user successfully registered");
      },
    

}