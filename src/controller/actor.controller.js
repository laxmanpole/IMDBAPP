const actorService = require('../services/actor.service')
const createActorValidation = require('../validation/actor.validation')
const updateValidation = require('../validation/actorupdate.validation')
const idValidation = require('../validation/id.validation')

const createActor = async (req, res) => {
	try {
		const validatedActor = await createActorValidation.validate(req.body, { abortEarly: false })
		const createdActor = await actorService.addActor(validatedActor)
		if (!createdActor) {
			return res.status(404).send({ 'message': 'Actor Not Found' })
		} else {
			return res.status(200).send({ 'message': 'successfully created' })
		}
	} catch (err) {
		return res.status(422).send({ 'message': err.message })
	}
}

const getActor = async (req, res) => {
	try {
		const validActor = await idValidation.validate(req.params, { abortEarly: false })
		const actorId = validActor.id
		if (actorId) {
			const actorDetail = await actorService.getActor({
				actorId,
			})
			if (!actorDetail) {
				return res.status(404).send({ 'message': 'Not Found' })
			} else {
				return res.status(200).send(actorDetail)
			}
		}
	} catch (err) {
		// console.log(err instanceof TypeError)
		return res.status(422).send(err.message)
	}
}

const updateActor = async (req, res) => {
	try {
		const validActor = await idValidation.validate(req.params, { abortEarly: false })
		const actorId = validActor.id
		const validatedReqBody = await updateValidation.validate(req.body)
		if (actorId) {
			const actorUpdated = await actorService.updateActor({ actorId, ...validatedReqBody })
			let record
			actorUpdated.forEach((udpatedCount) => {
				record = udpatedCount
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
		const validActor = await idValidation.validate(req.params, { abortEarly: false })
		const actorId = validActor.id
		if (actorId) {
			const actorDeleted = await actorService.deleteActor({
				actorId,
			})
			if (actorDeleted === 1) {
				return res.status(200).send({ 'message': 'delete successfully' })
			} else {
				return res.status(404).send({ 'message': 'Not Found' })
			}
		}
	} catch (err) {
		return res.status(422).send(err.message)
	}
}

const getActors = async (req, res) => {
	try {
		const actorList = await actorService.getActors({})
		if (!actorList) {
			return res.status(404).send({ 'message': 'Not Found' })
		} else {
			return res.status(200).send(actorList)
		}
	} catch (err) {
		return res.status(422).send(err.message)
	}
}

const actorController = {
	createActor,
	getActor,
	deleteActor,
	getActors,
	updateActor,
}

module.exports = actorController
