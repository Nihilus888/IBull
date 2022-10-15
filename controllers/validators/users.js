const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const JoiPassword = Joi.extend(joiPasswordExtendCore);

const userValidators = {
  createUser: Joi.object({
    id:Joi.string().optional(),
    name: Joi.string().min(5).required(),
    email: Joi.string().min(9).required(),
    password: JoiPassword.string().min(5).noWhiteSpaces().required(),
    confirmPassword : Joi.any().equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' }),

    job: Joi.string().min(3).required(),
    position: Joi.string().min(3),
    experience: Joi.number().min(1).required(),
    skills: Joi.array().items(Joi.object({
        name: Joi.string()
    })),
    
    if(err) {
      console.log(err);
      console.log(err[0])
    },
  }),
  editUser: Joi.object({
    id:Joi.string().optional(),
    name: Joi.string().min(5).required(),
    email: Joi.string().min(9).required(),
    password: JoiPassword.string().min(5).noWhiteSpaces().allow(null,''),
    confirmPassword : Joi.any().equal(Joi.ref('password'))
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' })
    .allow(null, ''),

    job: Joi.string().min(3).required(),
    position: Joi.string().min(3),
    experience: Joi.number().min(1).required(),
    skills: Joi.array().items(Joi.object({
        name: Joi.string()
    })),
    
    if(err) {
      console.log(err);
      console.log(err[0])
    },
  }),
};

module.exports = userValidators;