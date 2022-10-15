const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    // get Authentication header value
    
    const token = req.header('Authorization')
    console.log('authMiddleware token:', token)
    if (!token) {
        return res.status(401).json({
        message: "Authentication details empty"
        })
    }
    
    if (token.length === 0) {
        return res.status(401).json({
            message: "Invalid auth token"
        })
    }

    // set global var userAuth if JWT is valid
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    console.log('verified:', verified)

    if (verified) {
        //user._id
        //call res.locals.userAuth anywhere to get user information there
        res.locals.userAuth = verified
        console.log('res.locals.userAuth: ', res.locals.userAuth)
        next()
        return
    }

    return res.status(401).json({
        message: "Invalid auth token"
    })
}