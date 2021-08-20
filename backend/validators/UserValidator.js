var Joi = require('joi')

const createSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  full_name: Joi.string().required(),
  phone_number: Joi.required(),
})

const idSchema = Joi.object({
  id: Joi.number().required(),
})

const changePasswordSchema = Joi.object({
  id: Joi.number().required(),
  password: Joi.string().min(3).max(15).required(),
  password_confirmation: Joi.valid(Joi.ref('password')).required().messages({
    'any.only': `password tidak cocok`
  })
})

module.exports = {
  createSchema,
  idSchema,
  changePasswordSchema
}
