const { producerModel } = require('../managers/sequelize.manager')

const addProducer = async ({
	name, sex, dob, bio,
}) => {
	try {
		return await producerModel.create({
			name, sex, dob, bio,
		})
	} catch (err) {
		return err
	}
}

const getProducer = async ({ producerId }) => {
	try {
		return await producerModel.findOne({
			where: { id: producerId },
		})
	} catch (err) {
		return err
	}
}

const updateProducer = async ({
	name, sex, dob, bio, producerId,
}) => {
	try {
		return await producerModel.update({
			name, sex, dob, bio,
		}, {
			where: { id: producerId },
		})
	} catch (err) {
		return err
	}
}

const deleteProducer = async ({ producerId }) => {
	try {
		const producerData = await producerModel.findOne({
			where: { id: producerId },
		})
		if (!producerData) {
			throw new Error('not found')
		} else {
			return producerModel.destroy({
				where: { id: producerId },
			})
		}
	} catch (err) {
		return err
	}
}

const getProducers = async () => {
	try {
		return await producerModel.findAll({})
	} catch (err) {
		return err
	}
}

const produceService = {
	addProducer,
	getProducer,
	updateProducer,
	deleteProducer,
	getProducers,
}

module.exports = produceService
