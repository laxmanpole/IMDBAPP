const BaseJoi = require('joi')
const Extension = require('joi-date-extensions')

const Joi = BaseJoi.extend(Extension)

const schema = Joi.object().keys({
	name: Joi.string().required(),
	releaseYear: Joi.date().format('YYYY-MM-DD'),
	plot: Joi.string().required(),
	actor_id: Joi.number(),
	producer_id: Joi.number(),
	poster: Joi.string(),
})

module.exports = schema
