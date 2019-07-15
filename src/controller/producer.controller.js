const producerService = require('../services/producer.service')
const producerValidation = require('../validation/producer.validation')
const producerUpadate = require('../validation/actorupdate.validation')
const idValidation = require('../validation/id.validation')

const createProducer = async (req, res) => {
	try {
		const validatedReqData = await producerValidation.validate(req.body, { abortEarly: false })
		const producerData = await producerService.addProducer(validatedReqData)
		if (!producerData) {
			return res.status(404).send({ 'message': 'Producer Not Found' })
		} else {
			return res.status(200).send({ 'message': 'successfully created' })
		}
	} catch (err) {
		return res.status(422).send(err.message)
	}
}

const getProducer = async (req, res) => {
	try {
		const validProducer = await idValidation.validate(req.params, { abortEarly: false })
		const producerId = validProducer.id
		if (producerId) {
			const producerData = await producerService.getProducer({
				producerId,
			})
			if (!producerData) {
				return res.status(404).send({ 'message': 'Producer Not Found' })
			} else {
				return res.status(200).send(producerData)
			}
		}
	} catch (err) {
		return res.status(422).send(err.message)
	}
}

const updateProducer = async (req, res) => {
	try {
		const validProducer = await idValidation.validate(req.params, { abortEarly: false })
		const producerId = validProducer.id
		const validatedReqData = await producerUpadate.validate(req.body)
		if (producerId) {
			// eslint-disable-next-line max-len
			const updateProducerData = await producerService.updateProducer({ producerId, ...validatedReqData })
			let record
			updateProducerData.forEach((affectedCount) => {
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
		const validProducer = await idValidation.validate(req.params, { abortEarly: false })
		const producerId = validProducer.id
		if (producerId) {
			const recordsDeleted = await producerService.deleteProducer({
				producerId,
			})
			if (recordsDeleted === 1) {
				return res.status(200).send({ 'message': 'delete successfully' })
			} else {
				return res.status(404).send({ 'message': 'Not Found' })
			}
		}
	} catch (err) {
		return res.status(422).send(err.message)
	}
}

const getProducers = async (req, res) => {
	try {
		const producersListData = await producerService.getProducers({})
		if (!producersListData) {
			return res.status(404).send({ 'message': 'Not Found' })
		} else {
			return res.status(200).send(producersListData)
		}
	} catch (err) {
		return res.status(422).send(err.message)
	}
}

const producerController = {
	createProducer,
	getProducer,
	updateProducer,
	deleteProducer,
	getProducers,
}

module.exports = producerController
