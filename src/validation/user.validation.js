const Joi = require('joi')


const schema = Joi.object().keys({
	firstname: Joi.string().required(),
	lastname: Joi.string().required(),
	bio: Joi.string().required(),
})

module.exports = schema
