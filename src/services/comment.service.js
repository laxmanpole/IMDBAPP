const { CommentModel, MovieModel } = require('../managers/sequelize.manager')

const addComment = async ({
	// eslint-disable-next-line camelcase
	text, reviewerId, movieId,
}) => {
	console.log(text, reviewerId, movieId)
	try {
		return await CommentModel.create({
			text, reviewer_id: reviewerId, movie_id: movieId,
		})
	} catch (err) {
		return err
	}
}

const deleteComment = async ({
	// eslint-disable-next-line camelcase
	commentId, movieId,
}) => {
	// console.log(commentId, movieId)
	try {
		const movieDetails = await MovieModel.findOne({
			include: [{ model: CommentModel, where: { id: commentId } }],
			where: { id: movieId },
		})
		return movieDetails.comments[0].destroy().then(commentDetails => commentDetails)
	} catch (err) {
		return err
	}
}

const commentService = {
	addComment,
	deleteComment,
}

module.exports = commentService
