const userValidation = require('../validation/user.validation')
const reviewerService = require('../services/reviewer.service')

const createReviewer = async (req, res) => {
	try {
		const validatedReviewer = await userValidation.validate(req.body, { abortEarly: false })
		const createdReviewer = await reviewerService.addUser(validatedReviewer)
		if (!createdReviewer) {
			return res.status(404).send({ 'message': 'reviewer Not Found' })
		} else {
			return res.status(200).send({ 'message': 'successfully created' })
		}
	} catch (err) {
		return res.status(422).send({ 'message': err.message })
	}
}

const reviewerController = {
	createReviewer,
}

module.exports = reviewerController
