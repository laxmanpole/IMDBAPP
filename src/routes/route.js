const express = require('express')
const actorController = require('../controller/actor.controller')
const movieController = require('../controller/movie.controller')
const producerController = require('../controller/producer.controller')
const reviewerController = require('../controller/reviewer.controller')
const commentController = require('../controller/comment.controller')
const replyController = require('../controller/reply.controller')

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
// parallel
routes.get('/movie/:id/', movieController.getMovie)
// waterfall
routes.get('/movie/:id/waterfall', movieController.getMovieInfo)
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

routes.post('/reviewer', reviewerController.createReviewer)
routes.post('/movie/:id/comment', commentController.createComment)
routes.delete('/movie/:movieId/comment/:commentId', commentController.deleteComment)
routes.post('/movie/:movieId/comment/:commentId/reply', replyController.createReply)
routes.delete('/movie/:movieId/comment/:commentId/reply/:replyId', replyController.deleteReply)
routes.post('/movie/:movieId/rating', movieController.createRating)
routes.get('/movie/:id/rating', movieController.getRating)

module.exports = routes
