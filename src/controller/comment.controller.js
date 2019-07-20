const commentValidation = require('../validation/comment.validation')
const idValidation = require('../validation/id.validation')
const idsValidation = require('../validation/ids.validation')
const commentService = require('../services/comment.service')

const createComment = async (req, res) => {
	try {
		const validMovie = await idValidation.validate(req.params, { abortEarly: false })
		const movieId = validMovie.id
		const { reviewerId, text } = await commentValidation.validate(req.body, { abortEarly: false })
		console.log('==>', movieId, reviewerId, text)
		const createdComment = await commentService.addComment({ movieId, reviewerId, text })
		if (!createdComment) {
			return res.status(404).send({ 'message': 'Comment Not Found' })
		} else {
			return res.status(200).send({ 'message': 'successfully created' })
		}
	} catch (err) {
		return res.status(422).send({ 'message': err.message })
	}
}

const deleteComment = async (req, res) => {
	try {
		const { movieId, commentId } = await idsValidation.validate(req.params, { abortEarly: false })
		const deletedComment = await commentService.deleteComment({ movieId, commentId })
		if (!deletedComment) {
			return res.status(404).send({ 'message': 'Comment Not Found' })
		} else {
			return res.status(200).send({ 'message': 'successfully delted' })
		}
	} catch (err) {
		return res.status(422).send({ 'message': err.message })
	}
}

const commentController = {
	createComment,
	deleteComment,
}

module.exports = commentController
