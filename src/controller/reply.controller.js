const replyValidation = require('../validation/reply.validation')
const idValidation = require('../validation/ids.validation')
const replyService = require('../services/reply.service')

const createReply = async (req, res) => {
	try {
		const validMovieComment = await idValidation.validate(req.params, { abortEarly: false })
		const { movieId, commentId } = validMovieComment

		const { reviewerId, text } = await replyValidation.validate(req.body, { abortEarly: false })
		const createdReply = await replyService.addReply({
			movieId, commentId, reviewerId, text,
		})
		if (!createdReply) {
			return res.status(404).send({ 'message': 'reply Not Found' })
		} else {
			return res.status(200).send({ 'message': 'successfully created' })
		}
	} catch (err) {
		return res.status(422).send({ 'message': err.message })
	}
}

const deleteReply = async (req, res) => {
	try {
		const { movieId, commentId, replyId } = await idValidation.validate(req.params, { abortEarly: false })
		const createdReply = await replyService.deleteReply({
			movieId, commentId, replyId,
		})
		if (!createdReply) {
			return res.status(404).send({ 'message': 'reply Not Found' })
		} else {
			return res.status(200).send({ 'message': 'successfully deleted' })
		}
	} catch (err) {
		return res.status(422).send({ 'message': err.message })
	}
}

const replyController = {
	createReply,
	deleteReply,
}

module.exports = replyController
