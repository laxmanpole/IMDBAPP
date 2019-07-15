const { actorModel } = require('../managers/sequelize.manager')

const addActor = async ({
	name, sex, dob, bio,
}) => {
	try {
		return await actorModel.create({
			name, sex, dob, bio,
		})
	} catch (err) {
		return err
	}
}
const getActor = async ({ actorId }) => {
	try {
		return await actorModel.findOne({ where: { id: actorId } })
	} catch (err) {
		return err
	}
}

const updateActor = async ({
	name, sex, dob, bio, actorId,
}) => {
	console.log(actorId)
	try {
		return await actorModel.update({
			name, sex, dob, bio,
		}, { where: { id: actorId } })
	} catch (err) {
		return err
	}
}

const deleteActor = async ({ actorId }) => {
	try {
		const actorDetail = await actorModel.findOne({ where: { id: actorId } })
		if (!actorDetail) {
			throw new Error('Unable to find the actor')
		} else {
			return actorModel.destroy({ where: { id: actorId } })
		}
	} catch (err) {
		return err
	}
}

const getActors = async () => {
	try {
		return await actorModel.findAll({})
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
