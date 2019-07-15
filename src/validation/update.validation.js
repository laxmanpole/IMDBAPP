const Joi = require('joi')

const schema = Joi.object().keys({
	name: Joi.string(),
	releaseYear: Joi.date(),
	plot: Joi.string(),
	actor_id: Joi.number(),
	producer_id: Joi.number(),
	poster: Joi.string(),
})

module.exports = schema
