const BaseJoi = require('joi')
const Extension = require('joi-date-extensions')

const Joi = BaseJoi.extend(Extension)

const schema = Joi.object().keys({
	name: Joi.string(),
	sex: Joi.string(),
	dob: Joi.date().format('YYYY-MM-DD'),
	bio: Joi.string(),
})

module.exports = schema
