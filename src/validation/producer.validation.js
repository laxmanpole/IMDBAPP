const BaseJoi = require('joi')
const Extension = require('joi-date-extensions')

const Joi = BaseJoi.extend(Extension)

const schema = Joi.object().keys({
	name: Joi.string().required(),
	sex: Joi.string().required(),
	dob: Joi.date().format('YYYY-MM-DD'),
	bio: Joi.string().required(),
})

module.exports = schema
