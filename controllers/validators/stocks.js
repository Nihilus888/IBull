const Joi = require('joi')

const stockValidators = {
    createStock: Joi.object({
        user: Joi.object(),
        name: Joi.string().required(),
        symbol: Joi.string().required(),
        currency: Joi.string(),
        price: Joi.number().required(),
        enterpriseValue: Joi.string().required()
    }),

    if(err) {
        console.log('err: ', err)
    }
}

module.exports = stockValidators