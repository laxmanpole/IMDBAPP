const async = require('async')
const movieService = require('../services/movie.service')
const movieValidation = require('../validation/movie.validation')
const movieUpdation = require('../validation/movieUpdation')
const updateValidation = require('../validation/actorupdate.validation')
const idValidation = require('../validation/id.validation')
const idsValidation = require('../validation/ids.validation')
const starsValidation = require('../validation/rating.validation')

const createMovie = async (req, res) => {
	try {
		const validatedReqData = await movieValidation.validate(req.body, { abortEarly: false })
		const createdMovie = await movieService.addMovie(validatedReqData)
		if (!createdMovie) {
			return res.status(404).send({ 'message': 'Not Found' })
		} else {
			return res.status(200).send({ 'message': 'successfully created' })
		}
	} catch (err) {
		return res.status(422).send(err.message)
	}
}

const getMovie = async (req, res) => {
	try {
		const validMovie = await idValidation.validate(req.params, { abortEarly: false })
		const movieId = validMovie.id
		async.parallel([
			function movieDetail(callback) {
				if (movieId) {
					movieService
						.getMovie({ movieId })
						.then(movieInfo => callback(null, movieInfo))
						.catch(err => callback(err))
				}
			},
			function reviewerDetails(callback) {
				movieService
					.getReviewers({})
					.then(reviewerinfo => callback(null, reviewerinfo))
					.catch(err => callback(err))
			},
		], (err, result) => {
			if (err) {
				return res.status(404).send({ 'message': 'Not Found' })
			} else {
				return res.status(200).send(result)
			}
		})
	} catch (err) {
		return res.status(422).send(err.message)
	}
}

const getMovieInfo = async (req, res) => {
	try {
		const validMovie = await idValidation.validate(req.params, { abortEarly: false })
		const movieId = validMovie.id
		// Note: Why waterfall is required?
		async.waterfall([
			function movieDetail(callback) {
				if (movieId) {
					movieService.getMovie({
						movieId,
					}).then((movieInfo) => {
						// console.log(typeof movieInfo)
						callback(null, movieInfo)
					}).then((err) => {
					// console.log(err instanceof TypeError)
						callback(err)
					})
				}
			},
		], (err, result) => {
			if (err) {
				console.log(err instanceof TypeError)
				return res.status(404).send({ 'message': 'Not Found' })
			} else {
				return res.status(200).send(result)
			}
		})
	} catch (err) {
		console.log(typeof err)
		return res.status(422).send(err.message)
	}
}

// const getMovie = async (req, res) => {
// try {
// const validMovie = await idValidation.validate(req.params, { abortEarly: false })
// const movieId = validMovie.id

// if (movieId) {
// const movieDetail = await movieService.getMovie({
// movieId,
// })
// if (!movieDetail) {
// return res.status(404).send({ 'message': 'Not Found' })
// } else {
// return res.status(200).send(movieDetail)
// }
// }
// } catch (err) {
// return res.status(422).send(err.message)
// }
// }

const getMovies = async (req, res) => {
	try {
		const movieList = await movieService.getMovies({})
		if (!movieList) {
			return res.status(404).send({ 'message': 'Not Found' })
		} else {
			return res.status(200).send(movieList)
		}
	} catch (err) {
		return res.status(422).send(err.message)
	}
}

const updateMovie = async (req, res) => {
	try {
		const movieId = await idValidation.validate(req.params, { abortEarly: false })
		if (movieId) {
			const validatedReqData = await movieUpdation.validate(req.body, { abortEarly: false })
			const movieUpdated = await movieService.updateMovieInfo({ movieId, ...validatedReqData })
			let record
			movieUpdated.forEach((affectedCount) => {
				record = affectedCount
			})
			if (record === 1) {
				return res.status(200).send({ 'message': 'update successfully' })
			} else {
				return res.status(404).send({ 'message': 'Not Found' })
			}
		}
	} catch (err) {
		return res.status(422).send(err.message)
	}
}

const deleteMovie = async (req, res) => {
	try {
		const movieId = await idValidation.validate(req.params, { abortEarly: false })
		if (movieId) {
			const movieDeleted = await movieService.deleteMovie({
				movieId,
			})
			if (movieDeleted === 1) {
				return res.status(200).send({ 'message': 'delete successfully' })
			} else {
				return res.status(404).send({ 'message': 'Not Found' })
			}
		}
	} catch (err) {
		return res.status(422).send(err.message)
	}
}

const updateActor = async (req, res) => {
	try {
		const { movieId, actorId } = await idsValidation.validate(req.params, { abortEarly: false })
		const validatedReqData = await updateValidation.validate(req.body)
		if (movieId && actorId) {
			const actorUpdated = await movieService.updateActor({ movieId, actorId, ...validatedReqData })
			let record
			actorUpdated.forEach((affectedCount) => {
				record = affectedCount
			})
			if (record === 1) {
				return res.status(200).send({ 'message': 'update successfully' })
			} else {
				return res.status(404).send({ 'message': 'Not Found' })
			}
		}
	} catch (err) {
		return res.status(422).send(err.message)
	}
}
const deleteActor = async (req, res) => {
	try {
		const { movieId, actorId } = await idsValidation.validate(req.params, { abortEarly: false })
		if (movieId && actorId) {
			const movieDeleted = await movieService.deleteActor({ movieId, actorId })
			if (movieDeleted === 1) {
				return res.status(200).send({ 'message': 'delete successfully' })
			} else {
				return res.status(404).send({ 'message': 'Not Found' })
			}
		}
	} catch (err) {
		return res.status(422).send(err.message)
	}
}

const updateProducer = async (req, res) => {
	try {
		const { movieId, producerId } = await idsValidation.validate(req.params, { abortEarly: false })
		const validatedReqData = await updateValidation.validate(req.body)
		if (movieId && producerId) {
			const producerUpdated = await movieService.updateProducer({ movieId, producerId, ...validatedReqData })
			let record
			producerUpdated.forEach((affectedCount) => {
				record = affectedCount
			})
			if (record === 1) {
				return res.status(200).send({ 'message': 'update successfully' })
			} else {
				return res.status(404).send({ 'message': 'Not Found' })
			}
		}
	} catch (err) {
		return res.status(422).send(err.message)
	}
}

const deleteProducer = async (req, res) => {
	try {
		const { movieId, producerId } = await idsValidation.validate(req.params, { abortEarly: false })
		if (movieId && producerId) {
			const producerDeleted = await movieService.deleteProducer({ movieId, producerId })
			if (producerDeleted === 1) {
				return res.status(200).send({ 'message': 'delete successfully' })
			} else {
				return res.status(404).send({ 'message': 'Not Found' })
			}
		}
	} catch (err) {
		return res.status(422).send(err.message)
	}
}

const getMovieActors = (req, res) => {
	try {
		const movieId = req.params.id
		const loadActor = new Promise((resolve, reject) => {
			const actorList = movieService.actorList(movieId)
			actorList.then((data) => {
				resolve(data)
			}).catch((err) => {
				reject(err)
			})
		})
		loadActor.then(actorDetails => res.status(200).send(actorDetails)).catch((err) => {
			if (err) {
				return res.status(404).send({ 'message': ' Actors not found' })
			}
		})
	} catch (err) {
		return res.status(422).send(err.message)
	}
}

const getMovieProducers = (req, res) => {
	try {
		const producers = new Promise((resolve, reject) => {
			const movieId = req.params.id
			const producerlist = movieService.producerList(movieId)
			producerlist.then((data) => {
				resolve(data)
			}).catch((err) => {
				reject(err)
			})
		})
		producers.then(producerDetails => res.status(200).send(producerDetails)).catch((err) => {
			if (err) {
				return res.status(404).send({ 'message': ' Actors not found' })
			}
		})
	} catch (err) {
		return res.status(422).send(err.message)
	}
}

const getAsyncMovieActors = (req, res) => {
	try {
		const movieId = req.params.id
		const tasks = [
			function actorList(callback) {
				const movie = movieService.updateView(movieId)
				movie.then(movieDetails => callback(null, movieDetails)).catch(err => callback(err))
			},
			function viewCounter(callback) {
				const movie = movieService.viewDetails(movieId)
				movie.then(movieDetail => callback(null, movieDetail)).catch(err => callback(err))
			},
		]
		async.parallel(tasks, (err, results) => {
			if (err) {
				return res.status(404).send({ 'message': 'movie details not found' })
			} else {
				return res.status(200).send(results)
			}
		})
	} catch (err) {
		return res.status(422).send(err.message)
	}
}

const getAsyncMovieProducers = (req, res) => {
	try {
		const movieId = req.params.id
		const tasks = [
			function producerList(callback) {
				const movie = movieService.updateMovieView(movieId)
				movie.then(movieDetails => callback(null, movieDetails)).catch(err => callback(err))
			},
			function viewCounter(callback) {
				const movie = movieService.viewMovieDetails(movieId)
				movie.then(movieDetail => callback(null, movieDetail)).catch(err => callback(err))
			},
		]
		async.parallel(tasks, (err, results) => {
			if (err) {
				return res.status(404).send({ 'message': 'movie details not found' })
			} else {
				return res.status(200).send(results)
			}
		})
	} catch (err) {
		return res.status(422).send(err.message)
	}
}

const createRating = async (req, res) => {
	try {
		const validMovie = await idsValidation.validate(req.params, { abortEarly: false })
		const { movieId } = validMovie
		const { reviewStars, reviewerId } = await starsValidation.validate(req.body, { abortEarly: false })
		if (movieId && reviewerId) {
			const movieDetail = await movieService.createRating({
				movieId, reviewerId, reviewStars,
			})
			if (!movieDetail) {
				return res.status(404).send({ 'message': 'Not Found' })
			} else {
				return res.status(200).send(movieDetail)
			}
		}
	} catch (err) {
		return res.status(422).send(err.message)
	}
}

const getRating = async (req, res) => {
	try {
		const validMovie = await idValidation.validate(req.params, { abortEarly: false })
		const movieId = validMovie.id
		console.log(movieId)
		if (movieId) {
			const movieDetail = await movieService.getRating({
				movieId,
			})
			if (!movieDetail) {
				return res.status(404).send({ 'message': 'Not Found' })
			} else {
				return res.status(200).send(movieDetail)
			}
		}
	} catch (err) {
		return res.status(422).send(err.message)
	}
}


const movieController = {
	createMovie, // createMovie
	getMovies, // getMovies
	updateMovie, // updateMovie
	getMovie, // getMovie
	deleteMovie, // deleteMovie
	updateActor, // updateActor
	deleteActor, // deleteActor
	updateProducer, // updateProducer
	deleteProducer, // deleteProducer
	getMovieActors, // getMovieActors
	getMovieProducers, // getProducers
	getAsyncMovieActors, // getActors
	getAsyncMovieProducers,
	getRating,
	createRating,
	getMovieInfo,
}

module.exports = movieController
