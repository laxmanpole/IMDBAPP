const { ReplyModel, MovieModel, CommentModel } = require('../managers/sequelize.manager')

const addReply = async ({
	// eslint-disable-next-line camelcase
	text, movieId, reviewerId, commentId,
}) => {
	try {
		const movieDetails = await MovieModel.findOne({
			include: [{ model: CommentModel, where: { id: commentId } }],
			where: { id: movieId },
		})
		console.log(movieDetails.id, movieDetails.comments[0].id)
		if (movieDetails.id === movieId && movieDetails.comments[0].id === commentId) {
			return await ReplyModel.create({
				text, reviewer_id: reviewerId, comment_id: commentId,
			})
		}
	} catch (err) {
		return err
	}
}

const deleteReply = async ({
	// eslint-disable-next-line camelcase
	commentId, movieId, replyId,
}) => {
	try {
		const movieDetails = await MovieModel.findOne({
			include: [{ model: CommentModel, include: [{ model: ReplyModel, where: { id: replyId } }], where: { id: commentId } }],
			where: { id: movieId },
		})
		return movieDetails.comments[0].replies[0].destroy().then(replyDetails => replyDetails)
	} catch (err) {
		return err
	}
}

const replyService = {
	addReply,
	deleteReply,
}

module.exports = replyService
