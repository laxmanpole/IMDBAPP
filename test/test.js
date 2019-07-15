/* eslint-disable import/order */
/* eslint-disable no-unused-expressions */
const chai = require('chai')
const chaiHttp = require('chai-http')
const { describe, it } = require('mocha')
const server = require('../server')
const fs = require('fs')
const path = require('path')

chai.use(chaiHttp)
// eslint-disable-next-line no-unused-vars
const should = chai.should()
function test() {
	const testdata = fs.readFileSync(path.join(__dirname, '/test.json'))
	const testData = JSON.parse(testdata)
	return testData
}

describe('Test cases for Actors', () => {
	let response
	const testData = test()
	it('create new Actor by giving valid input', async () => {
		response = await chai
			.request(server)
			.post('/actor')
			.send(testData.createActor)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' create new Actor by giving Invalid input', async () => {
		response = await chai
			.request(server)
			.post('/actor')
			.send(testData.createActor)
		response.should.have.status(422)
		response.error.should.not.be.false
	})
	it(' To get available Actor by giving valid input', async () => {
		const { actorId } = testData.valid
		response = await chai
			.request(server)
			.get(`/actor/${actorId}`)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To get available Actor by giving Invalid input', async () => {
		const { actorId } = testData.invalid
		response = await chai
			.request(server)
			.get(`/actor/${actorId}`)
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To update Actor by giving valid input.', async () => {
		const { actorId } = testData.valid
		response = await chai
			.request(server)
			.put(`/actor/${actorId}`)
			.send(testData.updateActor)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it('To update Actor by giving Invalid input.', async () => {
		const { actorId } = testData.invalid
		response = await chai
			.request(server)
			.put(`/actor/${actorId}`)
			.send(testData.updateActor)
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To Delete Actor by giving valid input.', async () => {
		const { actorId } = testData.valid
		response = await chai
			.request(server)
			.delete(`/actor/${actorId}`)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it('To Delete Actor by giving Invalid input.', async () => {
		const { actorId } = testData.invalid
		response = await chai
			.request(server)
			.delete(`/actor/${actorId}`)
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To get all actor available in app ', async () => {
		response = await chai
			.request(server)
			.get('/actors')
		response.should.have.status(200)
		response.error.should.be.false
	})
})

describe('Test cases for Producers', () => {
	let response
	const testData = test()
	it('create new Producer by giving valid input', async () => {
		response = await chai
			.request(server)
			.post('/producer')
			.send(testData.createProducer)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it('create new Producer by giving Invalid input', async () => {
		response = await chai
			.request(server)
			.post('/producer')
			.send(testData.createProducer)
		response.should.have.status(422)
		response.error.should.not.be.false
	})
	it(' To get available Producer by giving valid input', async () => {
		const { producerId } = testData.valid
		response = await chai
			.request(server)
			.get(`/producer/${producerId}`)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To get Producer by giving Invalid input', async () => {
		const { producerId } = testData.invalid
		response = await chai
			.request(server)
			.get(`/producer/${producerId}`)
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To update Producer by giving valid input.', async () => {
		const { producerId } = testData.valid
		response = await chai
			.request(server)
			.put(`/producer/${producerId}`)
			.send(testData.updateProducer)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To update Producer by giving Invalid input.', async () => {
		const { producerId } = testData.invalid
		response = await chai
			.request(server)
			.put(`/producer/${producerId}`)
			.send(testData.updateProducer)
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To Delete Producer by giving valid input.', async () => {
		const { producerId } = testData.valid
		response = await chai
			.request(server)
			.delete(`/producer/${producerId}`)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To Delete Producer by giving Invalid input.', async () => {
		const { producerId } = testData.invalid
		response = await chai
			.request(server)
			.delete(`/producer/${producerId}`)
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To get all Producer available in app', async () => {
		response = await chai
			.request(server)
			.get('/producers')
		response.should.have.status(200)
		response.error.should.be.false
	})
})

describe('Test cases for Movies', () => {
	let response
	const testData = test()
	it('create new Movie by giving valid input', async () => {
		response = await chai
			.request(server)
			.post('/movie')
			.send(testData.createMovie)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To get available Movie by giving valid input', async () => {
		const { movieId } = testData.valid
		response = await chai
			.request(server)
			.get(`/movie/${movieId}`)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To get available Movie by giving Invalid input', async () => {
		const { movieId } = testData.invalid
		response = await chai
			.request(server)
			.get(`/movie/${movieId}`)
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To update Movie by giving valid input.', async () => {
		const { movieId } = testData.valid
		response = await chai
			.request(server)
			.get(`/movie/${movieId}`)
			.send(testData.updateMovie)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To update Movie by giving Invalid input.', async () => {
		const { movieId } = testData.invalid
		response = await chai
			.request(server)
			.get(`/movie/${movieId}`)
			.send(testData.createMovie)
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To Delete movie by giving valid input.', async () => {
		const { movieId } = testData.valid
		response = await chai
			.request(server)
			.delete(`/movie/${movieId}`)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To Delete movie by giving Invalid input.', async () => {
		const { movieId } = testData.invalid
		response = await chai
			.request(server)
			.delete(`/movie/${movieId}`)
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To get all movies available in app', async () => {
		response = await chai
			.request(server)
			.get('/movies')
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To update an Actor in movie by giving valid input', async () => {
		const { movieId, actorId } = testData.valid
		response = await chai
			.request(server)
			.put(`/movie/${movieId}/actor/${actorId}`)
			.send(testData.updateActorMovie)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To update an Actor in movie by giving Invalid input', async () => {
		const { movieId, actorId } = testData.invalid
		response = await chai
			.request(server)
			.put(`/movie/${movieId}/actor/${actorId}`)
			.send(testData.updateActorMovie)
		response.should.have.status(422)
		response.error.should.not.be.false
	})
	it(' To delete an Actor in movie by giving valid input', async () => {
		const { movieId, actorId } = testData.valid
		response = await chai
			.request(server)
			.delete(`/movie/${movieId}/actor/${actorId}`)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To delete an Actor in movie by giving Invalid input', async () => {
		const { movieId, actorId } = testData.invalid
		response = await chai
			.request(server)
			.delete(`/movie/${movieId}/actor/${actorId}`)
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To update an Producer in movie by giving valid input', async () => {
		const { movieId, producerId } = testData.valid
		response = await chai
			.request(server)
			.put(`/movie/${movieId}/producer/${producerId}`)
			.send(testData.updateProducerMovie)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To update an Producer in movie by giving Invalid input', async () => {
		const { movieId, producerId } = testData.invalid
		response = await chai
			.request(server)
			.put(`/movie/${movieId}/producer/${producerId}`)
			.send(testData.updateActor)
		response.should.have.status(422)
		response.error.should.not.be.false
	})
	it(' To delete an Producer in movie by giving valid input', async () => {
		const { movieId, producerId } = testData.valid
		response = await chai
			.request(server)
			.delete(`/movie/${movieId}/producer/${producerId}`)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To delete an Producer in movie by giving Invalid input', async () => {
		const { movieId, producerId } = testData.invalid
		response = await chai
			.request(server)
			.delete(`/movie/${movieId}/producer/${producerId}`)
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To get all actors in movie by giving valid ID', async () => {
		const { movieId } = testData.valid
		response = await chai
			.request(server)
			.get(`/movie/${movieId}/actor`)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To get all actors in movie by giving Invalid ID', async () => {
		const { movieId } = testData.invalid
		response = await chai
			.request(server)
			.get(`/movie/${movieId}/actors`)
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To get all producers in movie by giving valid ID', async () => {
		const { movieId } = testData.valid
		response = await chai
			.request(server)
			.get(`/movie/${movieId}/producers`)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To get all producers in movie by giving Invalid ID', async () => {
		const { movieId } = testData.invalid
		response = await chai
			.request(server)
			.get(`/movie/${movieId}/producers`)
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To get all actors in movie & view count will be change giving valid Id', async () => {
		const { movieId } = testData.valid
		response = await chai
			.request(server)
			.get(`/movie/${movieId}/actorList`)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it('To get all actors in movie & view count will be change giving Invalid Id', async () => {
		const { movieId } = testData.invalid
		response = await chai
			.request(server)
			.get(`/movie/${movieId}/actorList`)
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To get all producers in movie & view count will be change giving valid Id', async () => {
		const { movieId } = testData.valid
		response = await chai
			.request(server)
			.get(`/movie/${movieId}/producerList`)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To get all producers in movie & view count will be change giving Invalid Id', async () => {
		const { movieId } = testData.invalid
		response = await chai
			.request(server)
			.get(`/movie/${movieId}/producerList`)
		response.should.have.status(404)
		response.error.should.not.be.false
	})
})
