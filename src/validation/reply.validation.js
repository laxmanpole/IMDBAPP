const Joi = require('joi')

const schema = Joi.object().keys({
	commentId: Joi.number(),
	reviewerId: Joi.number(),
	text: Joi.string(),
})

module.exports = schema
