const { MovieModel } = require('../managers/sequelize.manager')
const { ActorModel } = require('../managers/sequelize.manager')
const { ProducerModel } = require('../managers/sequelize.manager')
const { RatingModel } = require('../managers/sequelize.manager')

const addMovie = async ({
	name, releaseYear, plot, poster,
}) => {
	try {
		if (name && releaseYear && typeof plot !== 'undefined') {
			return await MovieModel.create({
				name, releaseYear, plot, poster,
			})
		}
	} catch (err) {
		return err
	}
}
const getMovie = async ({ movieId }) => {
	try {
		const movieDetails = await MovieModel.findOne({
			include: [{ all: true, nested: true }],
			where: { id: movieId },
		})
		movieDetails.view += 1
		return movieDetails.save().then(movieDetail => movieDetail)
	} catch (err) {
		return err
	}
}

const getMovies = async () => {
	try {
		return await MovieModel.findAll({ include: [{ all: true, nested: true }] })
	} catch (err) {
		return err
	}
}

const updateMovieInfo = async ({
	movieId, name, releaseYear, plot, producerId, actorId,
}) => {
	try {
		const movieDetails = await MovieModel.findOne({
			where: { id: movieId },
		})
		if (!movieDetails) {
			return new Error('not found')
		}
		return await MovieModel.update({
			name,
			releaseYear,
			plot,
			actorId,
			producerId,
		}, {
			where: { id: movieId },
		})
	} catch (err) {
		return err
	}
}

const deleteMovie = async ({ movieId }) => {
	try {
		const movieDetails = await MovieModel.findOne({
			where: { id: movieId },
		})
		if (!movieDetails) {
			throw new Error('not found')
		}
		return MovieModel.destroy({
			where: { id: movieId },
		})
	} catch (err) {
		return err
	}
}
const updateActor = async ({
	name, sex, dob, bio, movieId, actorId,
}) => {
	try {
		const movieDetails = await MovieModel.findOne({
			where: { id: movieId },
			include: [{
				model: ActorModel,
				where: { id: actorId },
			}],
		})
		if (!movieDetails) {
			throw new Error('not found')
		} else {
			if (parseInt(movieDetails.actors[0].id) === parseInt(actorId)) {
				return await ActorModel.update({
					name, sex, dob, bio,
				}, {
					where: {
						id: actorId,
					},
				})
			}
			throw new Error('not found')
		}
	} catch (err) {
		return err
	}
}

const deleteActor = async ({ movieId, actorId }) => {
	try {
		const movieDetails = await MovieModel.findOne({
			where: { id: movieId },
			include: [{
				model: ActorModel,
				where: { id: actorId },
			}],
		})
		if (!movieDetails) {
			throw new Error('not found')
		} else {
			if (parseInt(movieDetails.actors[0].id) === parseInt(actorId)) {
				return await ActorModel.destroy({
					where: {
						id: actorId,
					},
				})
			}
			throw new Error('not found')
		}
	} catch (err) {
		return err
	}
}
const updateProducer = async ({
	name, sex, dob, bio, movieId, producerId,
}) => {
	try {
		const movieDetails = await MovieModel.findOne({
			where: { id: movieId },
			include: [{
				model: ProducerModel,
				where: { id: producerId },
			}],
		})
		if (!movieDetails) {
			throw new Error('not found')
		} else {
			if (parseInt(movieDetails.producers[0].id) === parseInt(producerId)) {
				return await ProducerModel.update({
					name, sex, dob, bio,
				}, {
					where: {
						id: producerId,
					},
				})
			}
			throw new Error('not found')
		}
	} catch (err) {
		return err
	}
}

const deleteProducer = async ({ movieId, producerId }) => {
	try {
		const movieDetails = await MovieModel.findOne({
			where: { id: movieId },
			include: [{
				model: ProducerModel,
				where: { id: producerId },
			}],
		})
		if (!movieDetails) {
			throw new Error('not found')
		} else {
			if (parseInt(movieDetails.producers[0].id) === parseInt(producerId)) {
				return await ProducerModel.destroy({
					where: {
						id: producerId,
					},
				})
			}
			throw new Error('not found')
		}
	} catch (err) {
		return err
	}
}

const actorList = movieId => new Promise(((resolve, reject) => {
	MovieModel.findOne({
		include: [{
			model: ActorModel,
		}],
		where: { id: movieId },
	}).then((movieDetails) => {
		resolve(movieDetails)
	}).catch((err) => {
		reject(err)
	})
}))

const producerList = movieId => new Promise(((resolve, reject) => {
	MovieModel.findOne({
		include: [{
			model: ProducerModel,
		}],
		where: { id: movieId },
	}).then((movieDetails) => {
		resolve(movieDetails)
	}).catch((err) => {
		reject(err)
	})
}))

const updateView = movieId => new Promise(((resolve, reject) => {
	MovieModel.findOne({
		include: [{
			model: ActorModel,
		}],
		where: { id: movieId },
	}).then((movieDetails) => {
		if (movieDetails) {
			const count = movieDetails.view + 1
			MovieModel.update({ view: count }, {
				where: {
					id: movieId,
				},
			}).then((data) => {
				resolve(data)
			}).catch((err) => {
				reject(err)
			})
		}
	}).catch((err) => {
		reject(err)
	})
}))

const viewDetails = movieId => new Promise(((resolve, reject) => {
	MovieModel.findOne({
		include: [{
			model: ActorModel,
		}],
		where: { id: movieId },
	}).then((movieDetails) => {
		resolve(movieDetails)
	}).catch((err) => {
		reject(err)
	})
}))

const updateMovieView = movieId => new Promise(((resolve, reject) => {
	MovieModel.findOne({
		include: [{
			model: ProducerModel,
		}],
		where: { id: movieId },
	}).then((movieDetails) => {
		if (movieDetails) {
			const count = movieDetails.view + 1
			MovieModel.update({ view: count + 1 }, {
				where: {
					id: movieId,
				},
			}).then((data) => {
				resolve(data)
			}).catch((err) => {
				reject(err)
			})
		}
	}).catch((err) => {
		reject(err)
	})
}))

const viewMovieDetails = movieId => new Promise(((resolve, reject) => {
	MovieModel.findOne({
		include: [{
			model: ProducerModel,
		}],
		where: { id: movieId },
	}).then((movieDetails) => {
		resolve(movieDetails)
	}).catch((err) => {
		reject(err)
	})
}))

const getRating = async ({ movieId }) => {
	try {
		const ratingDetails = await MovieModel.findOne({
			include: [{ model: RatingModel }],
			where: { id: movieId },
		})
		const starDetails = ratingDetails.ratings.map(ratings => ratings.reviewStars)
		let avgRating = 0
		starDetails.forEach((reviewStars) => {
			avgRating += reviewStars
		})
		avgRating /= starDetails.length
		ratingDetails.avgRating = avgRating
		return ratingDetails.save().then(movieDetails => movieDetails)
	} catch (err) {
		return err
	}
}

const movieService = {
	addMovie,
	getMovies,
	updateMovieInfo,
	getMovie,
	deleteMovie,
	updateActor,
	deleteActor,
	updateProducer,
	deleteProducer,
	actorList,
	producerList,
	viewDetails,
	updateView,
	updateMovieView,
	viewMovieDetails,
	getRating,
}

module.exports = movieService
