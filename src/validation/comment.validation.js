const Joi = require('joi')

const schema = Joi.object().keys({
	movieId: Joi.number(),
	reviewerId: Joi.number(),
	text: Joi.string(),
})

module.exports = schema
