const Joi = require('joi')

const schema = Joi.object().keys({
	id: Joi.number(),
})

module.exports = schema
