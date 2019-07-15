/* eslint-disable radix */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const { movieModel } = require('../managers/sequelize.manager')
const { actorModel } = require('../managers/sequelize.manager')
const { producerModel } = require('../managers/sequelize.manager')

const addMovie = async ({
	name, releaseYear, plot, poster,
}) => {
	try {
		if (name && releaseYear && typeof plot !== 'undefined') {
			return await movieModel.create({
				name, releaseYear, plot, poster,
			})
		}
	} catch (err) {
		return err
	}
}
const getMovie = async ({ movieId }) => {
	try {
		return await movieModel.findOne({
			include: [{ all: true, nested: true }],
			where: { id: movieId.id },
		})
	} catch (err) {
		return err
	}
}

const getMovies = async () => {
	try {
		return await movieModel.findAll({ include: [{ all: true, nested: true }] })
	} catch (err) {
		return err
	}
}

const updateMovieInfo = async ({
	movieId, name, releaseYear, plot, producer_id, actor_id,
}) => {
	try {
		const movieDetails = await movieModel.findOne({
			where: { id: movieId.id },
		})
		if (!movieDetails) {
			return new Error('not found')
		}
		return await movieModel.update({
			name,
			releaseYear,
			plot,
			actor_id,
			producer_id,
		}, {
			where: { id: movieId.id },
		})
	} catch (err) {
		return err
	}
}

const deleteMovie = async ({ movieId }) => {
	try {
		const movieDetails = await movieModel.findOne({
			where: { id: movieId.id },
		})
		if (!movieDetails) {
			throw new Error('not found')
		}
		return movieModel.destroy({
			where: { id: movieId.id },
		})
	} catch (err) {
		return err
	}
}
const updateActor = async ({
	name, sex, dob, bio, movieId, actorId,
}) => {
	try {
		const movieDetails = await movieModel.findOne({
			where: { id: movieId },
			include: [{
				model: actorModel,
				where: { id: actorId },
			}],
		})
		if (!movieDetails) {
			throw new Error('not found')
		} else {
			if (parseInt(movieDetails.actors[0].id) === parseInt(actorId)) {
				return await actorModel.update({
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
		const movieDetails = await movieModel.findOne({
			where: { id: movieId },
			include: [{
				model: actorModel,
				where: { id: actorId },
			}],
		})
		if (!movieDetails) {
			throw new Error('not found')
		} else {
			if (parseInt(movieDetails.actors[0].id) === parseInt(actorId)) {
				return await actorModel.destroy({
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
		const movieDetails = await movieModel.findOne({
			where: { id: movieId },
			include: [{
				model: producerModel,
				where: { id: producerId },
			}],
		})
		if (!movieDetails) {
			throw new Error('not found')
		} else {
			if (parseInt(movieDetails.producers[0].id) === parseInt(producerId)) {
				return await producerModel.update({
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
		const movieDetails = await movieModel.findOne({
			where: { id: movieId },
			include: [{
				model: producerModel,
				where: { id: producerId },
			}],
		})
		if (!movieDetails) {
			throw new Error('not found')
		} else {
			if (parseInt(movieDetails.producers[0].id) === parseInt(producerId)) {
				return await producerModel.destroy({
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
	movieModel.findOne({
		include: [{
			model: actorModel,
		}],
		where: { id: movieId },
	}).then((movieDetails) => {
		resolve(movieDetails)
	}).catch((err) => {
		reject(err)
	})
}))

const producerList = movieId => new Promise(((resolve, reject) => {
	movieModel.findOne({
		include: [{
			model: producerModel,
		}],
		where: { id: movieId },
	}).then((movieDetails) => {
		resolve(movieDetails)
	}).catch((err) => {
		reject(err)
	})
}))

const updateView = movieId => new Promise(((resolve, reject) => {
	movieModel.findOne({
		include: [{
			model: actorModel,
		}],
		where: { id: movieId },
	}).then((movieDetails) => {
		if (movieDetails) {
			const count = movieDetails.view + 1
			movieModel.update({ view: count }, {
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
	movieModel.findOne({
		include: [{
			model: actorModel,
		}],
		where: { id: movieId },
	}).then((movieDetails) => {
		resolve(movieDetails)
	}).catch((err) => {
		reject(err)
	})
}))

const updateMovieView = movieId => new Promise(((resolve, reject) => {
	movieModel.findOne({
		include: [{
			model: producerModel,
		}],
		where: { id: movieId },
	}).then((movieDetails) => {
		if (movieDetails) {
			const count = movieDetails.view + 1
			movieModel.update({ view: count + 1 }, {
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
	movieModel.findOne({
		include: [{
			model: producerModel,
		}],
		where: { id: movieId },
	}).then((movieDetails) => {
		resolve(movieDetails)
	}).catch((err) => {
		reject(err)
	})
}))

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
}

module.exports = movieService
