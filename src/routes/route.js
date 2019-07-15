const express = require('express')
const actorController = require('../controller/actor.controller')
const movieController = require('../controller/movie.controller')
const producerController = require('../controller/producer.controller')

const routes = express.Router({})

routes.post('/actor', actorController.createActor)
routes.get('/actor/:id/', actorController.getActor)
routes.get('/actors', actorController.getActors)
routes.put('/actor/:id/', actorController.updateActor)
routes.delete('/actor/:id/', actorController.deleteActor)

routes.post('/producer', producerController.createProducer)
routes.get('/producer/:id', producerController.getProducer)
routes.get('/producers', producerController.getProducers)
routes.put('/producer/:id', producerController.updateProducer)
routes.delete('/producer/:id', producerController.deleteProducer)

routes.post('/movie', movieController.createMovie)
routes.put('/movie/:id/', movieController.updateMovie)
routes.get('/movie/:id/', movieController.getMovie)
routes.get('/movies', movieController.getMovies)
routes.delete('/movie/:id/', movieController.deleteMovie)

routes.put('/movie/:movieId/actor/:actorId/', movieController.updateActor)
routes.delete('/movie/:movieId/actor/:actorId', movieController.deleteActor)
routes.delete('/movie/:movieId/producer/:producerId', movieController.deleteProducer)
routes.put('/movie/:movieId/producer/:producerId', movieController.updateProducer)

// Promises
routes.get('/movie/:id/actors', movieController.getMovieActors)
routes.get('/movie/:id/producers', movieController.getMovieProducers)

// Async Parallel
routes.get('/movie/:id/actorList', movieController.getAsyncMovieActors)
routes.get('/movie/:id/producerList', movieController.getAsyncMovieProducers)

module.exports = routes
