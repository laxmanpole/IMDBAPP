const { ActorModel } = require('../managers/sequelize.manager')

const addActor = async ({
	name, sex, dob, bio,
}) => {
	try {
		return await ActorModel.create({
			name, sex, dob, bio,
		})
	} catch (err) {
		return err
	}
}
const getActor = async ({ actorId }) => {
	try {
		return await ActorModel.findOne({ where: { id: actorId } })
	} catch (err) {
		console.log(err instanceof TypeError)
		return err
	}
}

const updateActor = async ({
	name, sex, dob, bio, actorId,
}) => {
	console.log(actorId)
	try {
		return await ActorModel.update({
			name, sex, dob, bio,
		}, { where: { id: actorId } })
	} catch (err) {
		return err
	}
}

const deleteActor = async ({ actorId }) => {
	try {
		const actorDetail = await ActorModel.findOne({ where: { id: actorId } })
		if (!actorDetail) {
			throw new Error('Unable to find the actor')
		} else {
			return ActorModel.destroy({ where: { id: actorId } })
		}
	} catch (err) {
		return err
	}
}

const getActors = async () => {
	try {
		return await ActorModel.findAll({})
	} catch (err) {
		return err
	}
}
const actorService = {
	addActor,
	getActor,
	updateActor,
	deleteActor,
	getActors,
}

module.exports = actorService
