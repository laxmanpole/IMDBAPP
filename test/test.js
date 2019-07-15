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
let response
function test() {
	const testdata = fs.readFileSync(path.join(__dirname, '/test.json'))
	const testData = JSON.parse(testdata)
	return testData
}

describe('Test cases for Actors', () => {
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
		response = await chai
			.request(server)
			.get('/actor/1')
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To get available Actor by giving Invalid input', async () => {
		response = await chai
			.request(server)
			.get('/actor/20')
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To update Actor by giving valid input.', async () => {
		response = await chai
			.request(server)
			.put('/actor/5')
			.send(testData.updateActor)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it('To update Actor by giving Invalid input.', async () => {
		response = await chai
			.request(server)
			.put('/actor/15')
			.send(testData.updateActor)
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To Delete Actor by giving valid input.', async () => {
		response = await chai
			.request(server)
			.delete('/actor/12')
		response.should.have.status(200)
		response.error.should.be.false
	})
	it('To Delete Actor by giving Invalid input.', async () => {
		response = await chai
			.request(server)
			.delete('/actor/18')
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
		response = await chai
			.request(server)
			.get('/producer/1')
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To get Producer by giving Invalid input', async () => {
		response = await chai
			.request(server)
			.get('/producer/15')
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To update Producer by giving valid input.', async () => {
		response = await chai
			.request(server)
			.put('/producer/2')
			.send(testData.updateProducer)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To update Producer by giving Invalid input.', async () => {
		response = await chai
			.request(server)
			.put('/producer/15')
			.send(testData.updateProducer)
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To Delete Producer by giving valid input.', async () => {
		response = await chai
			.request(server)
			.delete('/producer/3')
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To Delete Producer by giving Invalid input.', async () => {
		response = await chai
			.request(server)
			.delete('/producer/15')
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
		response = await chai
			.request(server)
			.get('/movie/2')
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To get available Movie by giving Invalid input', async () => {
		response = await chai
			.request(server)
			.get('/movie/18')
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To update Movie by giving valid input.', async () => {
		response = await chai
			.request(server)
			.get('/movie/2')
			.send(testData.updateMovie)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To update Movie by giving Invalid input.', async () => {
		response = await chai
			.request(server)
			.get('/movie/25')
			.send(testData.createMovie)
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To Delete movie by giving valid input.', async () => {
		response = await chai
			.request(server)
			.delete('/movie/3')
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To Delete movie by giving Invalid input.', async () => {
		response = await chai
			.request(server)
			.delete('/movie/25')
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
		response = await chai
			.request(server)
			.put('/movie/1/actor/1')
			.send(testData.updateActorMovie)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To update an Actor in movie by giving Invalid input', async () => {
		response = await chai
			.request(server)
			.put('/movie/1/actor/10')
			.send(testData.updateActorMovie)
		response.should.have.status(422)
		response.error.should.not.be.false
	})
	it(' To delete an Actor in movie by giving valid input', async () => {
		response = await chai
			.request(server)
			.delete('/movie/1/actor/2')
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To delete an Actor in movie by giving Invalid input', async () => {
		response = await chai
			.request(server)
			.delete('/movie/1/actor/15')
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To update an Producer in movie by giving valid input', async () => {
		response = await chai
			.request(server)
			.put('/movie/1/producer/1')
			.send(testData.updateProducerMovie)
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To update an Producer in movie by giving Invalid input', async () => {
		response = await chai
			.request(server)
			.put('/movie/1/producer/15')
			.send(testData.updateActor)
		response.should.have.status(422)
		response.error.should.not.be.false
	})
	it(' To delete an Producer in movie by giving valid input', async () => {
		response = await chai
			.request(server)
			.delete('/movie/2/producer/2')
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To delete an Producer in movie by giving Invalid input', async () => {
		response = await chai
			.request(server)
			.delete('/movie/1/producer/15')
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To get all actors in movie by giving valid ID', async () => {
		response = await chai
			.request(server)
			.get('/movie/1/actors')
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To get all actors in movie by giving Invalid ID', async () => {
		response = await chai
			.request(server)
			.get('/movie/15/actors')
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To get all producers in movie by giving valid ID', async () => {
		response = await chai
			.request(server)
			.get('/movie/1/producers')
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To get all producers in movie by giving Invalid ID', async () => {
		response = await chai
			.request(server)
			.get('/movie/15/producers')
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To get all actors in movie & view count will be change giving valid Id', async () => {
		response = await chai
			.request(server)
			.get('/movie/4/actorList')
		response.should.have.status(200)
		response.error.should.be.false
	})
	it('To get all actors in movie & view count will be change giving Invalid Id', async () => {
		response = await chai
			.request(server)
			.get('/movie/15/actorList')
		response.should.have.status(404)
		response.error.should.not.be.false
	})
	it(' To get all producers in movie & view count will be change giving valid Id', async () => {
		response = await chai
			.request(server)
			.get('/movie/1/producerList')
		response.should.have.status(200)
		response.error.should.be.false
	})
	it(' To get all producers in movie & view count will be change giving Invalid Id', async () => {
		response = await chai
			.request(server)
			.get('/movie/15/producerList')
		response.should.have.status(404)
		response.error.should.not.be.false
	})
})
