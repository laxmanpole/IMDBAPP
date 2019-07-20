const Joi = require('joi')

const schema = Joi.object().keys({
	movieId: Joi.number(),
	userId: Joi.number(),
	actorId: Joi.number(),
	commentId: Joi.number(),
	replyId: Joi.number(),
	producerId: Joi.number(),
})

module.exports = schema
