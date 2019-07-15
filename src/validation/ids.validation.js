const Joi = require('joi')

const schema = Joi.object().keys({
	movieId: Joi.number(),
	actorId: Joi.number(),
	producerId: Joi.number(),
})

module.exports = schema
