const Joi = require('joi')

const schema = Joi.object().keys({
	reviewStars: Joi.number(),
	reviewerId: Joi.string(),
})

module.exports = schema
